import { prisma } from '@/lib/db';
import { Request, Response } from 'express';

export async function getUser(req: Request, res: Response) {
  try {
    const user = await prisma.user
      .findUnique({
        where: {
          id: req.user.id,
        },
        select: {
          id: true,
          contact: true,
          firstName: true,
          lastName: true,
          nationality: true,
          address: true,
          residence: true,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.json(user);
  } catch (e: any) {
    res.json({
      name: e.name ?? 'Error',
      message: e.message,
    });
  }
}

export async function getAdmin(req: Request, res: Response) {
  try {
    const user = await prisma.admin
      .findUnique({
        where: {
          id: req.user.id,
        },
        select: {
          id: true,
          username: true,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.json(user);
  } catch (e: any) {
    res.json({
      name: e.name ?? 'Error',
      message: e.message,
    });
  }
}

// fav teams
export async function addFavTeam(req: Request, res: Response) {
  const { userId, teamId } = req.body;

  try {
    if (!userId || !teamId) {
      res.status(400);
      throw new Error('Missing IDs');
    }

    const result = await prisma.teamUser
      .create({
        data: {
          userId,
          teamId,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(result);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function removeFavTeam(req: Request, res: Response) {
  const { userId, teamId } = req.body;

  try {
    if (!userId || !teamId) {
      res.status(400);
      throw new Error('Missing IDs');
    }

    const result = await prisma.teamUser
      .delete({
        where: {
          teamId_userId: {
            teamId,
            userId,
          },
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(result);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function getFavTeams(req: Request, res: Response) {
  const { userId } = req.body;
  const { fields: qF } = req.query;

  try {
    if (!userId) {
      res.status(400);
      throw new Error('Missing parameters');
    }

    let result;
    let fields = qF ? (qF as string).split(',') : null;

    // partial query
    if (fields) {
      result = await prisma.user
        .findUnique({
          where: {
            id: userId,
          },
          select: {
            _count: fields.includes('_count')
              ? {
                  select: {
                    followedTeams: true,
                  },
                }
              : false,
            followedTeams: fields.includes('_count')
              ? false
              : {
                  select: {
                    followedAt: fields.includes('followedAt'),
                    teamId: fields.includes('teamId'),
                    userId: fields.includes('userId'),
                    team: fields.includes('team'),
                    user: fields.includes('user')
                      ? {
                          select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            contact: true,
                            nationality: true,
                            photo: true,
                          },
                        }
                      : false,
                  },
                  orderBy: {
                    team: {
                      name: 'asc',
                    },
                  },
                },
          },
        })
        .catch((e) => {
          res.status(422);
          throw e;
        });

      return res.json(result);
    }

    // full query
    result = await prisma.user
      .findUnique({
        where: {
          id: userId,
        },
        select: {
          followedTeams: {
            select: {
              followedAt: true,
              team: true,
            },
            orderBy: {
              team: {
                name: 'asc',
              },
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

export async function getOneFavTeam(req: Request, res: Response) {
  const { userId } = req.body;
  const { fields: qF } = req.query;

  try {
    if (!userId) {
      res.status(400);
      throw new Error('Missing parameters');
    }

    let result;
    let fields = qF ? (qF as string).split(',') : null;

    // partial query
    if (fields) {
      result = await prisma.team
        .findUnique({
          where: {
            id: req.params.teamId,
          },
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

      return res.json(result);
    }

    // full query
    result = await prisma.team
      .findUnique({
        where: {
          id: req.params.teamId,
          AND: {
            followingUsers: {
              some: {
                userId,
              },
            },
          },
        },
        select: {
          id: true,
          name: true,
          code: true,
          flag: true,
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
