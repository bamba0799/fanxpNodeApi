import { prisma } from '@/lib/db';
import { Request, Response } from 'express';

export async function createGroup(req: Request, res: Response) {
  const { label } = req.body;

  try {
    if (!label) {
      res.status(400);
      throw new Error('Missing parameter');
    }

    const group = await prisma.group
      .create({
        data: { label },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(group);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function getGroups(req: Request, res: Response) {
  const { fields: qF } = req.query;

  try {
    let result;
    let fields = qF ? (qF as string).split(',') : null;

    // Query specific fields
    if (fields) {
      result = await prisma.group
        .findMany({
          select: {
            _count: fields.includes('_count'),
            id: fields.includes('id'),
            label: fields.includes('label'),
            teams: fields.includes('teams')
              ? {
                  orderBy: {
                    name: 'asc',
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

    // Query every fields
    result = await prisma.group
      .findMany({
        orderBy: { label: 'asc' },
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

export async function getOneGroup(req: Request, res: Response) {
  const { groupId } = req.params;
  const { fields: qF } = req.query;

  try {
    let result;
    let fields = qF ? (qF as string).split(',') : null;

    // Query specific fields
    if (fields) {
      result = await prisma.group
        .findUnique({
          where: {
            id: groupId,
          },
          select: {
            _count: fields.includes('_count'),
            id: fields.includes('id'),
            label: fields.includes('label'),
            teams: fields.includes('teams')
              ? {
                  orderBy: {
                    name: 'asc',
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

    // Query every fields
    result = await prisma.group
      .findUnique({
        where: { id: groupId },
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

export async function updateGroup(req: Request, res: Response) {
  const { groupId } = req.params;
  const { label } = req.body;

  try {
    const group = await prisma.group
      .update({
        where: {
          id: groupId,
        },
        data: {
          label,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(group);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function deleteGroup(req: Request, res: Response) {
  const { groupId } = req.params;

  try {
    await prisma.group
      .delete({
        where: {
          id: groupId,
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
