import { prisma } from '@/lib/db';
import { Request, Response } from 'express';

export async function createMatch(req: Request, res: Response) {
  const {
    date,
    status,
    time,
    stadiumId,
    stageId,
    homeTeamId,
    awayTeamId,
    groupId,
  } = req.body; //  status in 'over' | 'live' | 'next'

  try {
    if (!date || !stadiumId || !homeTeamId || !stageId || !awayTeamId) {
      res.status(400);
      throw new Error('Missing parameters');
    }

    if (homeTeamId === awayTeamId) {
      res.status(403);
      throw new Error('Duplicate team');
    }

    const match = await prisma.match
      .create({
        data: {
          date: new Date(date).toISOString(),
          time: new Date(time ?? date).toISOString(),
          status: status ?? 'next',
          stadiumId,
          matchStageTeam: {
            createMany: {
              data: [
                {
                  teamId: homeTeamId,
                  stageId,
                },
                {
                  teamId: awayTeamId,
                  stageId,
                },
              ],
            },
          },
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(match);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function getMatchs(req: Request, res: Response) {
  const { date, fields: qF, stageId } = req.query;

  try {
    let result;
    let fields = qF ? (qF as string).split(',') : null;

    // date & stage based query
    if (date || stageId) {
      // partial query
      if (fields) {
        result = await prisma.match
          .findMany({
            where: {
              date: date
                ? {
                    equals: new Date(<string>date),
                  }
                : undefined,
              AND: stageId
                ? {
                    matchStageTeam: {
                      every: {
                        stageId: <string>stageId,
                      },
                    },
                  }
                : undefined,
            },
            select: {
              _count: fields.includes('_count'),
              id: fields.includes('id'),
              date: fields.includes('date'),
              time: fields.includes('time'),
              status: fields.includes('status'),
              stadiumId: fields.includes('stadiumId'),
              stadium: fields.includes('stadium')
                ? {
                    select: {
                      id: true,
                      name: true,
                      city: true,
                      photo: true,
                    },
                  }
                : false,
              matchStageTeam: fields.includes('matchStageTeam')
                ? {
                    select: {
                      assists: true,
                      corners: true,
                      fouls: true,
                      goals: true,
                      isWinner: true,
                      offsides: true,
                      possession: true,
                      redCards: true,
                      yellowCard: true,
                      team: {
                        select: {
                          id: true,
                          name: true,
                          code: true,
                          flag: true,
                        },
                      },
                      stage: {
                        select: {
                          id: true,
                          label: true,
                          debut: true,
                          end: true,
                        },
                      },
                    },
                  }
                : false,
              matchTicketUser: fields.includes('matchTicketUser'), // TODO: ...
            },
            orderBy: [
              {
                date: 'asc',
              },
              {
                time: 'asc',
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
      result = await prisma.match
        .findMany({
          where: {
            date: date
              ? {
                  equals: new Date(<string>date),
                }
              : undefined,
            AND: stageId
              ? {
                  matchStageTeam: {
                    every: {
                      stageId: <string>stageId,
                    },
                  },
                }
              : undefined,
          },
          select: {
            id: true,
            date: true,
            time: true,
            status: true,
            stadium: {
              select: {
                id: true,
                name: true,
                city: true,
                photo: true,
              },
            },
            matchStageTeam: {
              select: {
                assists: true,
                corners: true,
                fouls: true,
                goals: true,
                isWinner: true,
                offsides: true,
                possession: true,
                redCards: true,
                yellowCard: true,
                team: {
                  select: {
                    id: true,
                    name: true,
                    code: true,
                    flag: true,
                  },
                },
                stage: {
                  select: {
                    id: true,
                    label: true,
                    debut: true,
                    end: true,
                  },
                },
              },
            },
          },
          orderBy: [
            {
              date: 'asc',
            },
            {
              time: 'asc',
            },
          ],
        })
        .catch((e) => {
          res.status(422);
          throw e;
        });

      return res.json(result);
    }

    // partial query
    if (fields) {
      result = await prisma.match
        .findMany({
          select: {
            _count: fields.includes('_count'),
            id: fields.includes('id'),
            date: fields.includes('date'),
            time: fields.includes('time'),
            status: fields.includes('status'),
            stadiumId: fields.includes('stadiumId'),
            stadium: fields.includes('stadium')
              ? {
                  select: {
                    id: true,
                    name: true,
                    city: true,
                    photo: true,
                  },
                }
              : false,
            matchStageTeam: fields.includes('matchStageTeam')
              ? {
                  select: {
                    assists: true,
                    corners: true,
                    fouls: true,
                    goals: true,
                    isWinner: true,
                    offsides: true,
                    possession: true,
                    redCards: true,
                    yellowCard: true,
                    team: {
                      select: {
                        id: true,
                        name: true,
                        code: true,
                        flag: true,
                      },
                    },
                    stage: {
                      select: {
                        id: true,
                        label: true,
                        debut: true,
                        end: true,
                      },
                    },
                  },
                }
              : false,
            matchTicketUser: fields.includes('matchTicketUser'), // TODO: ...
          },
          orderBy: [
            {
              date: 'asc',
            },
            {
              time: 'asc',
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
    result = await prisma.match
      .findMany({
        select: {
          id: true,
          date: true,
          time: true,
          status: true,
          stadium: {
            select: {
              id: true,
              name: true,
              city: true,
              photo: true,
            },
          },
          matchStageTeam: {
            select: {
              assists: true,
              corners: true,
              fouls: true,
              goals: true,
              isWinner: true,
              offsides: true,
              possession: true,
              redCards: true,
              yellowCard: true,
              team: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                  flag: true,
                },
              },
              stage: {
                select: {
                  id: true,
                  label: true,
                  debut: true,
                  end: true,
                },
              },
            },
          },
        },
        orderBy: [
          {
            date: 'asc',
          },
          {
            time: 'asc',
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

export async function getOneMatch(req: Request, res: Response) {
  const { matchId } = req.params;
  const { fields: qF } = req.query;

  try {
    let result;
    let fields = qF ? (qF as string).split(',') : null;

    // partial query
    if (fields) {
      result = await prisma.match
        .findUnique({
          where: {
            id: matchId,
          },
          select: {
            _count: fields.includes('_count'),
            id: fields.includes('id'),
            date: fields.includes('date'),
            time: fields.includes('time'),
            status: fields.includes('status'),
            stadiumId: fields.includes('stadiumId'),
            stadium: fields.includes('stadium')
              ? {
                  select: {
                    id: true,
                    name: true,
                    city: true,
                    photo: true,
                  },
                }
              : false,
            matchStageTeam: fields.includes('matchStageTeam')
              ? {
                  select: {
                    assists: true,
                    corners: true,
                    fouls: true,
                    goals: true,
                    isWinner: true,
                    offsides: true,
                    possession: true,
                    redCards: true,
                    yellowCard: true,
                    team: {
                      select: {
                        id: true,
                        name: true,
                        code: true,
                        flag: true,
                      },
                    },
                    stage: {
                      select: {
                        id: true,
                        label: true,
                        debut: true,
                        end: true,
                      },
                    },
                  },
                }
              : false,
            matchTicketUser: fields.includes('matchTicketUser'), // TODO: ...
          },
        })
        .catch((e) => {
          res.status(422);
          throw e;
        });

      return res.json(result);
    }

    // full query
    result = await prisma.match
      .findUnique({
        where: { id: matchId },
        select: {
          id: true,
          date: true,
          time: true,
          status: true,
          stadium: {
            select: {
              id: true,
              name: true,
              city: true,
              photo: true,
            },
          },
          matchStageTeam: {
            select: {
              assists: true,
              corners: true,
              fouls: true,
              goals: true,
              isWinner: true,
              offsides: true,
              possession: true,
              redCards: true,
              yellowCard: true,
              team: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                  flag: true,
                },
              },
              stage: {
                select: {
                  id: true,
                  label: true,
                  debut: true,
                  end: true,
                },
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

export async function updateMatch(req: Request, res: Response) {
  const { matchId } = req.params;
  const { date, time, status, stadiumId } = req.body; // status in 'over' | 'live' | 'next'

  try {
    if (!date || !time || !status || !stadiumId) {
      res.status(400);
      throw new Error('Missing parameters');
    }

    // update match base infos only
    const match = await prisma.match
      .update({
        where: {
          id: matchId,
        },
        data: {
          date,
          time,
          status,
          stadiumId,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    // TODO: handle match stats update 💀

    res.status(201).json(match);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function deleteMatch(req: Request, res: Response) {
  const { matchId } = req.params;

  try {
    await prisma.match
      .delete({
        where: {
          id: matchId,
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
