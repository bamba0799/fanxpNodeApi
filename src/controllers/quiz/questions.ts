import { prisma } from '@/lib/db';
import { Request, Response } from 'express';

export async function createQuestion(req: Request, res: Response) {
  const { label, quizId, duration } = req.body;

  try {
    if (!label || !quizId) {
      res.status(400);
      throw new Error('Missing parameters: label, quizId');
    }

    const question = await prisma.question
      .create({
        data: {
          label,
          quiz: {
            connect: {
              id: quizId,
            },
          },
          duration: duration || null,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(question);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function updateQuestion(req: Request, res: Response) {
  const { label, duration } = req.body;

  try {
    if (!label) {
      res.status(400);
      throw new Error('Missing parameter: label');
    }

    const updatedQuestion = await prisma.question
      .update({
        where: {
          id: req.params.questionId,
        },
        data: {
          label,
          duration: duration || null,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(updatedQuestion);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function deleteQuestion(req: Request, res: Response) {
  try {
    await prisma.question
      .delete({
        where: {
          id: req.params.questionId,
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
