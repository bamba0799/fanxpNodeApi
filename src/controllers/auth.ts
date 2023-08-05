import { Request, Response } from 'express';
import { prisma } from '@/lib/db';
import { generateOTP, sendOtpMessage } from '@/utils/auth/otp';
import { generateToken } from '@/utils/auth/tokens';
import { AxiosError } from 'axios';

export async function getAuth(req: Request, res: Response) {
  const { contact } = req.body;

  try {
    if (!contact) {
      res.status(400);
      throw new Error('Missing parameter: contact');
    }

    // check for an existing user based on contact
    const user = await prisma.user
      .findUnique({
        where: {
          contact,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    // register if no user found
    if (user == null) {
      await prisma.user
        .create({
          data: {
            contact,
          },
        })
        .catch((e) => {
          res.status(422);
          throw e;
        });
    }

    // generate & send OTP
    const otpValue = generateOTP(4);

    const otp = await prisma.oTP
      .create({
        data: {
          value: otpValue,
          user: {
            connect: { contact },
          },
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    await sendOtpMessage({ contact, otp: otp.value }).catch((e) => {
      if (e instanceof AxiosError && e.response) {
        res.status(e.status ?? 422);
        throw {
          name: e.response.data?.error,
          message: e.response.data?.error_description,
        };
      }

      res.status(422);
      throw e;
    });

    res.sendStatus(200);
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}

export async function verifyOtp(req: Request, res: Response) {
  const { otp } = req.body;

  try {
    if (!otp) {
      res.status(400);
      throw new Error('Missing parameter: otp');
    }

    const userOtp = await prisma.oTP
      .findFirst({
        where: {
          value: otp,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    if (userOtp == null) {
      res.status(403);
      throw new Error('Invalid OTP');
    }

    const user = await prisma.user
      .findUnique({
        where: { contact: userOtp.userContact },
        select: { id: true, contact: true },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    if (user == null) {
      res.status(403);
      throw new Error('Invalid OTP');
    }

    // generate tokens
    const accessToken = await generateToken({
      variant: 'access',
      payload: user,
    });

    const refreshToken = await generateToken({
      variant: 'refresh',
      payload: user,
    });

    // send the response
    res.json({
      ...user,
      accessToken,
      refreshToken,
    });
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}
