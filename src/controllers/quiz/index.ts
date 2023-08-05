import { prisma } from '@/lib/db';
import { Request, Response } from 'express';

export async function createQuiz(req: Request, res: Response) {
  const { label } = req.body;

  try {
    if (!label) {
      res.status(400);
      throw new Error('Missing parameter: label');
    }

    const quiz = await prisma.quiz
      .create({
        data: {
          label,
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
            id: true,
            label: true,
            questions: fields.includes('questions')
              ? {
                  select: {
                    id: true,
                    label: true,
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
            id: true,
            label: true,
            questions: fields.includes('questions')
              ? {
                  select: {
                    id: true,
                    label: true,
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
  const { label } = req.body;

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
