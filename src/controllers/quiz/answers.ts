import { prisma } from '@/lib/db';
import { Request, Response } from 'express';

export async function createAnswer(req: Request, res: Response) {
  const { value, isCorrect, questionId } = req.body;

  try {
    if (!value || isCorrect == null || !questionId) {
      res.status(400);
      throw new Error('Missing parameters');
    }

    const answer = await prisma.response
      .create({
        data: {
          value,
          isCorrect,
          question: {
            connect: {
              id: questionId,
            },
          },
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(answer);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function updateAnswer(req: Request, res: Response) {
  const { value, isCorrect } = req.body;

  try {
    if (!value || isCorrect == null) {
      res.status(400);
      throw new Error('Missing parameters');
    }

    const updatedAnswer = await prisma.response
      .update({
        where: {
          id: req.params.answerId,
        },
        data: {
          value,
          isCorrect,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(updatedAnswer);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function deleteAnswer(req: Request, res: Response) {
  try {
    await prisma.response
      .delete({
        where: {
          id: req.params.answerId,
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
