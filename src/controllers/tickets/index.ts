import { prisma } from '@/lib/db';
import { Request, Response } from 'express';

export async function createTicket(req: Request, res: Response) {
  const { matricule, categoryId, seatId } = req.body;

  try {
    if (!matricule || !categoryId || !seatId) {
      res.status(400);
      throw new Error('Missing parameters: matricule, categoryId & seatId');
    }

    const ticket = await prisma.ticket
      .create({
        data: {
          matricule,
          categoryId,
          seatId,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(ticket);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function getTickets(req: Request, res: Response) {
  const { fields: qF } = req.query;

  try {
    let result;
    let fields = qF ? (qF as string).split(',') : null;

    // partial query
    if (fields) {
      result = await prisma.ticket
        .findMany({
          select: {
            _count: fields.includes('_count'),
            id: fields.includes('id'),
            categoryId: fields.includes('categoryId'),
            matricule: fields.includes('matricule'),
            seatId: fields.includes('seatId'),
            category: fields.includes('category')
              ? {
                  select: {
                    id: true,
                    label: true,
                    price: true,
                  },
                }
              : false,
            seat: fields.includes('seat')
              ? {
                  select: {
                    id: true,
                    row: true,
                    stadium: {
                      select: {
                        id: true,
                        name: true,
                        city: true,
                        contact: true,
                        photo: true,
                      },
                    },
                  },
                }
              : false,
            matchTicketUser: fields.includes('matchTicketUser')
              ? {
                  select: {
                    match: {
                      select: {
                        id: true,
                        date: true,
                        time: true,
                        status: true,
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
    result = await prisma.ticket
      .findMany({
        select: {
          id: true,
          matricule: true,
          category: {
            select: {
              id: true,
              label: true,
              price: true,
            },
          },
          seat: {
            select: {
              id: true,
              row: true,
            },
          },
          matchTicketUser: {
            select: {
              match: {
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
                      contact: true,
                      photo: true,
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

export async function getOneTicket(req: Request, res: Response) {
  const { fields: qF } = req.query;

  try {
    let result;
    let fields = qF ? (qF as string).split(',') : null;

    // partial query
    if (fields) {
      result = await prisma.ticket
        .findUnique({
          where: {
            id: req.params.ticketId,
          },
          select: {
            _count: fields.includes('_count'),
            id: fields.includes('id'),
            categoryId: fields.includes('categoryId'),
            matricule: fields.includes('matricule'),
            seatId: fields.includes('seatId'),
            category: fields.includes('category')
              ? {
                  select: {
                    id: true,
                    label: true,
                    price: true,
                  },
                }
              : false,
            seat: fields.includes('seat')
              ? {
                  select: {
                    id: true,
                    row: true,
                    stadium: {
                      select: {
                        id: true,
                        name: true,
                        city: true,
                        contact: true,
                        photo: true,
                      },
                    },
                  },
                }
              : false,
            matchTicketUser: fields.includes('matchTicketUser')
              ? {
                  select: {
                    match: {
                      select: {
                        id: true,
                        date: true,
                        time: true,
                        status: true,
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
    result = await prisma.ticket
      .findUnique({
        where: {
          id: req.params.ticketId,
        },
        select: {
          id: true,
          matricule: true,
          category: {
            select: {
              id: true,
              label: true,
              price: true,
            },
          },
          seat: {
            select: {
              id: true,
              row: true,
            },
          },
          matchTicketUser: {
            select: {
              match: {
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
                      contact: true,
                      photo: true,
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

export async function updateTicket(req: Request, res: Response) {
  const { matricule, categoryId, seatId } = req.body;

  try {
    if (!matricule || !categoryId || !seatId) {
      res.status(400);
      throw new Error('Missing parameters: matricule, categoryId & seatId');
    }

    const ticket = await prisma.ticket
      .update({
        where: {
          id: req.params.ticketId,
        },
        data: {
          matricule,
          categoryId,
          seatId,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.status(201).json(ticket);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function deleteTicket(req: Request, res: Response) {
  try {
    await prisma.ticket
      .delete({
        where: {
          id: req.params.ticketId,
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
