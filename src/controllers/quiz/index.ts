import { User } from './../../../node_modules/.prisma/client/index.d';
import { prisma } from '@/lib/db';
import { Request, Response } from 'express';
import { isModuleNamespaceObject } from 'util/types';

export async function createQuiz(req: Request, res: Response) {
  const { label, date } = req.body;

  try {
    if (!label) {
      res.status(400);
      throw new Error('Missing parameter: label');
    }

    const quiz = await prisma.quiz
      .create({
        data: {
          label,
          date: date ?? null,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(quiz);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function givePointToUser(req:Request, res:Response) {
  const {questionId, quizId, responseId, userId, point} = req.body

  try{
    if (!questionId || !quizId || !responseId || !userId || typeof point !== "number" || (typeof point === "number" && point < 0)) {
      res.status(400);
      throw new Error('Missing parameters');
    }

    const questionQuizResponseUser = await prisma.questionQuizResponseUser
    .create({
      data: {
        questionId,
        quizId,
        responseId,
        userId,
        point
      }
    }).catch((e:any) => {
      
      throw e
    })
    res.status(200).json(questionQuizResponseUser)
  } catch(error:any){
    res.json({
      name:error.name,
      message:error.message

    })
  }
}



export async function getManyQuiz(req: Request, res: Response) {
  const { fields: qF } = req.query;

  try {
    let result;
    let fields = qF ? (qF as string).split(',') : null;

    // customized query
    if (fields) {
      result = await prisma.quiz
        .findMany({
          select: {
            id: fields.includes('id'),
            label: fields.includes('label'),
            date: fields.includes('date'),
            questions: fields.includes('questions')
              ? {
                  select: {
                    id: true,
                    label: true,
                    duration: true,
                    suggestedResponses: fields.includes('responses')
                      ? {
                          select: {
                            id: true,
                            value: true,
                            isCorrect: true,
                          },
                        }
                      : false,
                  },
                }
              : false,
            questionQuizResponseUser: fields.includes('details'),
            _count: fields.includes('_count')
              ? true
              : !fields.includes('questions'),
          },
        })
        .catch((e) => {
          res.status(422);
          throw e;
        });

      return res.json(result);
    }

    // base query (id & label)
    result = await prisma.quiz
      .findMany({
        include: {
          _count: true,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.json(result);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function getUserSumPointPerQuiz(req:Request, res:Response){
  const id = req.params.quizId
  console.log(id)
  try{
  
    const users = await prisma.questionQuizResponseUser.groupBy({
      by: ['userId'],
      _sum: {
        point: true,
      },
      where: {
        quizId: id,
      },
    });

    // Maintenant, effectuons une jointure avec la table "user"
    const usersWithUserData = await prisma.user.findMany({
      where: {
        id: {
          in: users.map((user) => user.userId),
        },
      },
      select: {
        id: true,
        contact: true,
        firstName:true,
        photo:true,
        address:true
        // Ajoutez ici les autres champs de l'utilisateur que vous souhaitez récupérer
      },
    });

    // Combinez les données des deux requêtes
    const result = users.map((user) => {
      const userData = usersWithUserData.find((u) => u.id === user.userId);
      return {
        userId: user.userId,
        contact: userData ? userData.contact : null,
        totalPoints: user._sum.point,
        firstName: userData ? userData.firstName : null,
        photo: userData ? userData.photo : null,
        address: userData ? userData.address : null,
        
        // Ajoutez ici d'autres données d'utilisateur et de réponse au quiz si nécessaire
      };
    });

    res.json(result);
  } catch (e) {
    res.json({
     e
    });
}
}

export async function getOneQuiz(req: Request, res: Response) {
  const { fields: qF } = req.query;

  try {
    let result;
    let fields = qF ? (qF as string).split(',') : null;

    // customized query
    if (fields) {
      result = await prisma.quiz
        .findUnique({
          where: {
            id: req.params.quizId,
          },
          select: {
            id: fields.includes('id'),
            label: fields.includes('label'),
            date: fields.includes('date'),
            questions: fields.includes('questions')
              ? {
                  select: {
                    id: true,
                    label: true,
                    duration: true,
                    suggestedResponses: fields.includes('responses')
                      ? {
                          select: {
                            id: true,
                            value: true,
                            isCorrect: true,
                          },
                        }
                      : false,
                  },
                }
              : false,
            questionQuizResponseUser: fields.includes('details'),
            _count: fields.includes('_count')
              ? true
              : !fields.includes('questions'),
          },
        })
        .catch((e) => {
          res.status(422);
          throw e;
        });

      return res.json(result);
    }

    // base query (id & label)
    result = await prisma.quiz
      .findUnique({
        where: {
          id: req.params.quizId,
        },
        include: {
          _count: true,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.json(result);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function updateQuiz(req: Request, res: Response) {
  const { label, date } = req.body;

  try {
    if (!label) {
      res.status(400);
      throw new Error('Missing parameter: label');
    }

    const quiz = await prisma.quiz
      .update({
        where: {
          id: req.params.quizId,
        },
        data: {
          label,
          date: date ?? null,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(quiz);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function deleteQuiz(req: Request, res: Response) {
  try {
    await prisma.quiz
      .delete({
        where: {
          id: req.params.quizId,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.sendStatus(204);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}


