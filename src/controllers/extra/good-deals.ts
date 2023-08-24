import { prisma } from '@/lib/db';
import { Request, Response } from 'express';

export async function createDeal(req: Request, res: Response) {
  const { label, photo } = req.body;

  try {
    if (!label || !photo) {
      res.status(400);
      throw new Error("Missing parameter: 'label'");
    }

    const deal = await prisma.goodDeal
      .create({
        data: {
          label,
          photo,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(deal);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function getDeals(req: Request, res: Response) {
  const { fields: qF } = req.query;

  try {
    let result;
    let fields = qF ? (qF as string).split(',') : null;

    // partial query
    if (fields) {
      result = await prisma.goodDeal
        .findMany({
          select: {
            id: fields.includes('id'),
            label: fields.includes('label'),
            photo: fields.includes('photo'),
            interestPointId: fields.includes('interestPointId'),
            interestPoint: fields.includes('interestPoint')
              ? {
                  select: {
                    id: true,
                    name: true,
                    contact: true,
                    location: true,
                    vip: true,
                    InterestPointCategory: {
                      select: {
                        id: true,
                        label: true,
                      },
                    },
                  },
                }
              : false,
          },
          orderBy: {
            label: 'asc',
          },
        })
        .catch((e) => {
          res.status(422);
          throw e;
        });

      return res.json(result);
    }

    // full query
    result = await prisma.goodDeal
      .findMany({
        select: {
          id: true,
          label: true,
          photo: true,
          interestPointId: true,
        },
        orderBy: {
          label: 'asc',
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

export async function getOneDeal(req: Request, res: Response) {
  const { fields: qF } = req.query;

  try {
    let result;
    let fields = qF ? (qF as string).split(',') : null;

    // partial query
    if (fields) {
      result = await prisma.goodDeal
        .findMany({
          where: {
            id: req.params.dealId,
          },
          select: {
            id: fields.includes('id'),
            label: fields.includes('label'),
            photo: fields.includes('photo'),
            interestPointId: fields.includes('interestPointId'),
            interestPoint: fields.includes('interestPoint')
              ? {
                  select: {
                    id: true,
                    name: true,
                    contact: true,
                    location: true,
                    vip: true,
                    InterestPointCategory: {
                      select: {
                        id: true,
                        label: true,
                      },
                    },
                  },
                }
              : false,
          },
          orderBy: {
            label: 'asc',
          },
        })
        .catch((e) => {
          res.status(422);
          throw e;
        });

      return res.json(result);
    }

    // full query
    result = await prisma.goodDeal
      .findMany({
        where: {
          id: req.params.dealId,
        },
        select: {
          id: true,
          label: true,
          photo: true,
          interestPointId: true,
        },
        orderBy: {
          label: 'asc',
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

export async function updateDeal(req: Request, res: Response) {
  const { label, photo } = req.body;

  try {
    if (!label || !photo) {
      res.status(400);
      throw new Error('Missing parameters');
    }

    const deal = await prisma.goodDeal
      .update({
        where: {
          id: req.params.dealId,
        },
        data: {
          label,
          photo,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(deal);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function deleteDeal(req: Request, res: Response) {
  try {
    await prisma.goodDeal
      .delete({
        where: {
          id: req.params.dealId,
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
