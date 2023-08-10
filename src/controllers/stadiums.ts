import { prisma } from '@/lib/db';
import { Request, Response } from 'express';

export async function createStadium(req: Request, res: Response) {
  const { name, city, capacity, location, photo } = req.body;

  try {
    if (!name || !city || !capacity || !location || !photo) {
      res.status(400);
      throw new Error('Missing parameters');
    }

    const stadium = await prisma.stadium
      .create({
        data: {
          name,
          city,
          capacity,
          location,
          photo,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(stadium);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function getStadiums(req: Request, res: Response) {
  const { fields: qF } = req.query;

  try {
    let result;
    let fields = qF ? (qF as string).split(',') : null;

    // Query specific fields
    if (fields) {
      result = await prisma.stadium
        .findMany({
          select: {
            _count: fields.includes('_count'),
            id: fields.includes('id'),
            name: fields.includes('name'),
            city: fields.includes('city'),
            location: fields.includes('location'),
            matchs: fields.includes('matchs'),
            photo: fields.includes('photo'),
            seats: fields.includes('seats'),
          },
          orderBy: {
            name: 'asc',
          },
        })
        .catch((e) => {
          res.status(422);
          throw e;
        });

      return res.json(result);
    }

    // Query every fields
    result = await prisma.stadium
      .findMany({
        orderBy: { name: 'asc' },
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

export async function getOneStadiums(req: Request, res: Response) {
  const { stadiumId } = req.params;
  const { fields: qF } = req.query;

  try {
    let result;
    let fields = qF ? (qF as string).split(',') : null;

    // Query specific fields
    if (fields) {
      result = await prisma.stadium
        .findUnique({
          where: {
            id: stadiumId,
          },
          select: {
            _count: fields.includes('_count'),
            id: fields.includes('id'),
            name: fields.includes('name'),
            city: fields.includes('city'),
            location: fields.includes('location'),
            matchs: fields.includes('matchs'),
            photo: fields.includes('photo'),
            seats: fields.includes('seats'),
          },
        })
        .catch((e) => {
          res.status(422);
          throw e;
        });

      return res.json(result);
    }

    // Query every fields
    result = await prisma.stadium
      .findUnique({
        where: { id: stadiumId },
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

export async function updateStadium(req: Request, res: Response) {
  const { stadiumId } = req.params;
  const { name, city, capacity, location, photo } = req.body;

  try {
    if (!name || !city || !capacity || !location || !photo) {
      res.status(400);
      throw new Error('Missing parameters');
    }

    const stadium = await prisma.stadium
      .update({
        where: {
          id: stadiumId,
        },
        data: {
          name,
          city,
          capacity,
          location,
          photo,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(stadium);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function deleteStadium(req: Request, res: Response) {
  const { stadiumId } = req.params;

  try {
    await prisma.stadium
      .delete({
        where: {
          id: stadiumId,
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
