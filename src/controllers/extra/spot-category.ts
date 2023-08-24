import { prisma } from '@/lib/db';
import { Request, Response } from 'express';

export async function createCategory(req: Request, res: Response) {
  const { label } = req.body;

  try {
    if (!label) {
      res.status(400);
      throw new Error("Missing parameter: 'label'");
    }

    const category = await prisma.interestPointCategory
      .create({
        data: { label },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(category);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function getCategories(req: Request, res: Response) {
  const { fields: qF, status } = req.query;

  try {
    let result;
    let fields = qF ? (qF as string).split(',') : null;

    // partial query
    if (fields) {
      result = await prisma.interestPointCategory
        .findMany({
          select: {
            _count: fields.includes('_count'),
            id: fields.includes('id'),
            label: fields.includes('label'),
            interestPoints: fields.includes('spots')
              ? {
                  where:
                    (status as string)?.toLowerCase() === 'vip'
                      ? {
                          vip: true,
                        }
                      : undefined,
                  select: {
                    contact: true,
                    id: true,
                    location: true,
                    photo: true,
                    shortDescription: true,
                    name: true,
                    vip: true,
                    goodDeals: fields.includes('promotions')
                      ? {
                          select: {
                            id: true,
                            label: true,
                            photo: true,
                          },
                        }
                      : false,
                  },
                  take:
                    (status as string)?.toLowerCase() === 'vip' ? 3 : undefined,
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

    // base query
    result = await prisma.interestPointCategory
      .findMany({
        select: {
          id: true,
          label: true,
          interestPoints:
            (status as string)?.toLowerCase() === 'vip'
              ? {
                  where: {
                    vip: true,
                  },
                  select: {
                    contact: true,
                    id: true,
                    location: true,
                    photo: true,
                    shortDescription: true,
                    name: true,
                    vip: true,
                  },
                }
              : undefined,
        },
        take: (status as string)?.toLowerCase() === 'vip' ? 3 : undefined,
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

export async function getOneCategory(req: Request, res: Response) {
  const { fields: qF } = req.query;

  try {
    let result;
    let fields = qF ? (qF as string).split(',') : null;

    // partial query
    if (fields) {
      result = await prisma.interestPointCategory
        .findUnique({
          where: {
            id: req.params.categoryId,
          },
          select: {
            _count: fields.includes('_count'),
            id: fields.includes('id'),
            label: fields.includes('label'),
            interestPoints: fields.includes('spots')
              ? {
                  select: {
                    contact: true,
                    id: true,
                    location: true,
                    photo: true,
                    shortDescription: true,
                    name: true,
                    vip: true,
                    goodDeals: fields.includes('promotions')
                      ? {
                          select: {
                            id: true,
                            label: true,
                            photo: true,
                          },
                        }
                      : false,
                  },
                }
              : false,
          },
        })
        .catch((e) => {
          res.status(422);
          throw e;
        });

      return res.json(result);
    }

    // basr query
    result = await prisma.interestPointCategory
      .findUnique({
        where: {
          id: req.params.categoryId,
        },
        select: {
          id: true,
          label: true,
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

export async function updateCategory(req: Request, res: Response) {
  const { label } = req.body;

  try {
    if (!label) {
      res.status(400);
      throw new Error("Missing parameter: 'label'");
    }

    const category = await prisma.interestPointCategory
      .update({
        where: { id: req.params.categoryId },
        data: { label },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(category);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function deleteCategory(req: Request, res: Response) {
  try {
    await prisma.interestPointCategory
      .delete({
        where: {
          id: req.params.categoryId,
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
