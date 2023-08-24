import { prisma } from '@/lib/db';
import { Request, Response } from 'express';

export async function createSpot(req: Request, res: Response) {
  const {
    contact,
    location,
    longDescription,
    name,
    shortDescription,
    categoryId,
    vip,
  } = req.body;

  try {
    if (
      !contact ||
      !location ||
      !longDescription ||
      !name ||
      !shortDescription ||
      !categoryId ||
      vip == null
    ) {
      res.status(400);
      throw new Error('Missing parameters');
    }

    const spot = await prisma.interestPoint
      .create({
        data: {
          contact,
          location,
          longDescription,
          name,
          shortDescription,
          vip,
          InterestPointCategory: {
            connect: {
              id: categoryId,
            },
          },
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(spot);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function getSpots(req: Request, res: Response) {
  const { fields: qF } = req.query;

  try {
    let result;
    let fields = qF ? (qF as string).split(',') : null;

    // partial query
    if (fields) {
      result = await prisma.interestPoint
        .findMany({
          select: {
            _count: fields.includes('_count'),
            id: fields.includes('id'),
            contact: fields.includes('contact'),
            interestPointCategoryId: fields.includes('interestPointCategoryId'),
            longDescription: fields.includes('longDescription'),
            name: fields.includes('name'),
            location: fields.includes('location'),
            photo: fields.includes('photo'),
            shortDescription: fields.includes('shortDescription'),
            vip: fields.includes('vip'),
            goodDeals: fields.includes('goodDeals')
              ? {
                  select: {
                    id: true,
                    label: true,
                    photo: true,
                  },
                }
              : false,
            InterestPointCategory: fields.includes('InterestPointCategory')
              ? {
                  select: {
                    id: true,
                    label: true,
                  },
                }
              : false,
          },
          orderBy: [
            {
              vip: 'asc',
            },
            {
              name: 'asc',
            },
          ],
        })
        .catch((e) => {
          res.status(422);
          throw e;
        });

      return res.json(result);
    }

    // full query
    result = await prisma.interestPoint
      .findMany({
        include: {
          goodDeals: {
            select: {
              id: true,
              label: true,
              photo: true,
            },
          },
        },
        orderBy: [
          {
            vip: 'asc',
          },
          {
            name: 'asc',
          },
        ],
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

export async function getOneSpot(req: Request, res: Response) {
  const { fields: qF } = req.query;

  try {
    let result;
    let fields = qF ? (qF as string).split(',') : null;

    // partial query
    if (fields) {
      result = await prisma.interestPoint
        .findUnique({
          where: {
            id: req.params.spotId,
          },
          select: {
            _count: fields.includes('_count'),
            id: fields.includes('id'),
            contact: fields.includes('contact'),
            interestPointCategoryId: fields.includes('interestPointCategoryId'),
            longDescription: fields.includes('longDescription'),
            name: fields.includes('name'),
            location: fields.includes('location'),
            photo: fields.includes('photo'),
            shortDescription: fields.includes('shortDescription'),
            vip: fields.includes('vip'),
            goodDeals: fields.includes('goodDeals')
              ? {
                  select: {
                    id: true,
                    label: true,
                    photo: true,
                  },
                }
              : false,
            InterestPointCategory: fields.includes('InterestPointCategory')
              ? {
                  select: {
                    id: true,
                    label: true,
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

    // full query
    result = await prisma.interestPoint
      .findUnique({
        where: {
          id: req.params.spotId,
        },
        include: {
          goodDeals: {
            select: {
              id: true,
              label: true,
              photo: true,
            },
          },
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

export async function updateSpot(req: Request, res: Response) {
  const {
    contact,
    location,
    longDescription,
    name,
    shortDescription,
    categoryId,
    vip,
  } = req.body;

  try {
    if (
      !contact ||
      !location ||
      !longDescription ||
      !name ||
      !shortDescription ||
      !categoryId ||
      vip == null
    ) {
      res.status(400);
      throw new Error('Missing parameters');
    }

    const spot = await prisma.interestPoint
      .update({
        where: {
          id: req.params.spotId,
        },
        data: {
          contact,
          location,
          longDescription,
          name,
          shortDescription,
          vip,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(spot);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function deleteSpot(req: Request, res: Response) {
  try {
    await prisma.interestPoint
      .delete({
        where: {
          id: req.params.spotId,
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
