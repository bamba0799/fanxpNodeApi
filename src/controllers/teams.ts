import { prisma } from '@/lib/db';
import { Request, Response } from 'express';

export async function createTeam(req: Request, res: Response) {
  const { name, code, flag, isMemberOfCurrentCAN, isDiqualified, groupId } =
    req.body;

  try {
    if (
      !name ||
      !code ||
      !flag ||
      isMemberOfCurrentCAN == null ||
      isDiqualified == null
    ) {
      res.status(400);
      throw new Error('Missing parameters');
    }

    const team = await prisma.team
      .create({
        data: {
          name,
          code,
          flag,
          isMemberOfCurrentCAN,
          isDiqualified: isMemberOfCurrentCAN ? isDiqualified : false,
          groupId: isMemberOfCurrentCAN ? groupId : null,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(team);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function getTeams(req: Request, res: Response) {
  const { fields: qF } = req.query;

  try {
    let result;
    let fields = qF ? (qF as string).split(',') : null;

    // Query specific fields
    if (fields) {
      result = await prisma.team
        .findMany({
          select: {
            _count: fields.includes('_count'),
            id: fields.includes('id'),
            name: fields.includes('name'),
            code: fields.includes('code'),
            flag: fields.includes('flag'),
            isMemberOfCurrentCAN: fields.includes('isMemberOfCurrentCAN'),
            isDiqualified: fields.includes('isDiqualified'),
            groupId: fields.includes('groupId'),
            group: fields.includes('group'),
            players: fields.includes('players'),
            followingUsers: fields.includes('followingUsers'),
            matchStageTeam: fields.includes('matchStageTeam'),
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
    result = await prisma.team
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

export async function getOneTeam(req: Request, res: Response) {
  const { teamId } = req.params;
  const { fields: qF } = req.query;

  try {
    let team;
    let fields = qF ? (qF as string).split(',') : null;

    // Query specific fields
    if (fields) {
      team = await prisma.team
        .findUnique({
          where: { id: teamId },
          select: {
            _count: fields.includes('_count'),
            id: fields.includes('id'),
            name: fields.includes('name'),
            code: fields.includes('code'),
            flag: fields.includes('flag'),
            isMemberOfCurrentCAN: fields.includes('isMemberOfCurrentCAN'),
            isDiqualified: fields.includes('isDiqualified'),
            groupId: fields.includes('groupId'),
            group: fields.includes('group'),
            players: fields.includes('players'),
            followingUsers: fields.includes('followingUsers'),
            matchStageTeam: fields.includes('matchStageTeam'),
          },
        })
        .catch((e) => {
          res.status(422);
          throw e;
        });

      return res.json(team);
    }

    // Query every fields
    team = await prisma.team
      .findUnique({
        where: { id: teamId },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.json(team);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function updateTeam(req: Request, res: Response) {
  const { teamId } = req.params;
  const { name, code, flag, isMemberOfCurrentCAN, isDiqualified, groupId } =
    req.body;

  try {
    if (
      !name ||
      !code ||
      !flag ||
      isMemberOfCurrentCAN == null ||
      isDiqualified == null
    ) {
      res.status(400);
      throw new Error('Missing parameters');
    }

    const team = await prisma.team
      .update({
        where: {
          id: teamId,
        },
        data: {
          name,
          code,
          flag,
          isMemberOfCurrentCAN,
          isDiqualified,
          groupId: groupId ?? null,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(team);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function deleteTeam(req: Request, res: Response) {
  const { teamId } = req.params;

  try {
    await prisma.team
      .delete({
        where: {
          id: teamId,
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

export async function addToAGroup(req: Request, res: Response) {
  const { teamId, groupId } = req.body;

  try {
    if (!teamId || !groupId) {
      res.status(400);
      throw new Error('Missing parameters');
    }

    const team = await prisma.team
      .update({
        where: {
          id: teamId,
        },
        data: {
          isMemberOfCurrentCAN: true,
          group: {
            connect: {
              id: groupId,
            },
          },
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(team);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function removeToAGroup(req: Request, res: Response) {
  const { teamId } = req.body;

  try {
    if (!teamId) {
      res.status(400);
      throw new Error('Missing parameters');
    }

    const team = await prisma.team
      .update({
        where: {
          id: teamId,
        },
        data: {
          group: {
            disconnect: true,
          },
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(team);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}
