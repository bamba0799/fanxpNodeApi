import { prisma } from '@/lib/db';
import { Request, Response } from 'express';

export async function createStage(req: Request, res: Response) {
  const { label, debut, end } = req.body;

  try {
    if (!label || !debut || !end) {
      res.status(400);
      throw new Error('Missing parameters');
    }

    const stage = await prisma.stage
      .create({
        data: {
          label,
          debut,
          end,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(stage);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function getStages(req: Request, res: Response) {
  const { fields: qF } = req.query;

  try {
    let result;
    let fields = qF ? (qF as string).split(',') : null;

    // partial query
    if (fields) {
      result = await prisma.stage
        .findMany({
          select: {
            _count: fields.includes('_count'),
            id: fields.includes('id'),
            label: fields.includes('label'),
            debut: fields.includes('debut'),
            end: fields.includes('end'),
            matchStageTeam: fields.includes('matchStageTeam')
              ? {
                  select: {
                    team: {
                      select: {
                        id: true,
                        name: true,
                        code: true,
                        flag: true,
                        isMemberOfCurrentCAN: true,
                        isDiqualified: true,
                        group: {
                          select: {
                            id: true,
                            label: true,
                          },
                        },
                      },
                    },
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
    result = await prisma.stage
      .findMany({
        include: {
          matchStageTeam: {
            select: {
              team: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                  flag: true,
                  isMemberOfCurrentCAN: true,
                  isDiqualified: true,
                  group: {
                    select: {
                      id: true,
                      label: true,
                    },
                  },
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

export async function getOneStage(req: Request, res: Response) {
  const { stageId } = req.params;
  const { fields: qF } = req.query;

  try {
    let result;
    let fields = qF ? (qF as string).split(',') : null;

    // partial query
    if (fields) {
      result = await prisma.stage
        .findUnique({
          where: {
            id: stageId,
          },
          select: {
            _count: fields.includes('_count'),
            id: fields.includes('id'),
            label: fields.includes('label'),
            debut: fields.includes('debut'),
            end: fields.includes('end'),
            matchStageTeam: fields.includes('matchStageTeam')
              ? {
                  select: {
                    team: {
                      select: {
                        id: true,
                        name: true,
                        code: true,
                        flag: true,
                        isMemberOfCurrentCAN: true,
                        isDiqualified: true,
                        group: {
                          select: {
                            id: true,
                            label: true,
                          },
                        },
                      },
                    },
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
    result = await prisma.stage
      .findUnique({
        where: {
          id: stageId,
        },
        include: {
          matchStageTeam: {
            select: {
              team: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                  flag: true,
                  isMemberOfCurrentCAN: true,
                  isDiqualified: true,
                  group: {
                    select: {
                      id: true,
                      label: true,
                    },
                  },
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

export async function updateStage(req: Request, res: Response) {
  const { stageId } = req.params;
  const { label, debut, end } = req.body;

  try {
    const stage = await prisma.stage
      .update({
        where: {
          id: stageId,
        },
        data: {
          label,
          debut,
          end,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(stage);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function deleteStage(req: Request, res: Response) {
  const { stageId } = req.params;

  try {
    await prisma.stage
      .delete({
        where: {
          id: stageId,
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
