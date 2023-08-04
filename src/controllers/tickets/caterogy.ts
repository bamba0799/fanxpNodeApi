import { prisma } from '@/lib/db';
import { Request, Response } from 'express';

export async function createCategory(req: Request, res: Response) {
  const { label, price } = req.body;

  try {
    if (!label || !price) {
      res.status(400);
      throw new Error('Missing parameters: label & price');
    }

    const category = await prisma.ticketCategory
      .create({
        data: {
          label,
          price,
        },
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
  const { fields: qF } = req.query;

  try {
    let result;
    let fields = qF ? (qF as string).split(',') : null;

    // partial query
    if (fields) {
      result = await prisma.ticketCategory
        .findMany({
          select: {
            _count: fields.includes('_count'),
            id: fields.includes('id'),
            label: fields.includes('label'),
            price: fields.includes('price'),
            tickets: fields.includes('tickets')
              ? {
                  select: {
                    id: true,
                    matricule: true,
                    _count: true,
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
    result = await prisma.ticketCategory
      .findMany({
        select: {
          id: true,
          label: true,
          price: true,
          _count: true,
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

export async function getOneCategory(req: Request, res: Response) {
  const { fields: qF } = req.query;

  try {
    let result;
    let fields = qF ? (qF as string).split(',') : null;

    // partial query
    if (fields) {
      result = await prisma.ticketCategory
        .findUnique({
          where: {
            id: req.params.categoryId,
          },
          select: {
            id: fields.includes('id'),
            label: fields.includes('label'),
            tickets: fields.includes('spots')
              ? {
                  select: {
                    id: true,
                    matricule: true,
                    _count: true,
                  },
                }
              : false,
            _count: fields.includes('_count'),
          },
        })
        .catch((e) => {
          res.status(422);
          throw e;
        });

      return res.json(result);
    }

    // full query
    result = await prisma.ticketCategory
      .findUnique({
        where: {
          id: req.params.categoryId,
        },
        select: {
          id: true,
          label: true,
          price: true,
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

export async function updateCategory(req: Request, res: Response) {
  const { label, price } = req.body;

  try {
    if (!label || !price) {
      res.status(400);
      throw new Error("Missing parameter: 'label & price'");
    }

    const category = await prisma.ticketCategory
      .update({
        where: {
          id: req.params.categoryId,
        },
        data: {
          label,
          price,
        },
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
    await prisma.ticketCategory
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
