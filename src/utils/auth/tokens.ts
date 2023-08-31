import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from '@/constants/variables';
import jwt from 'jsonwebtoken';

type TokenType = 'access' | 'refresh';

type TokenConfig = {
  variant: TokenType;
  payload: string | object | Buffer;
};

type VerifyTokenProps = {
  token: string;
  type: TokenType;
};

/** Asynchronously generate an access or a refresh token. */
export function generateToken({
  variant,
  payload,
}: TokenConfig): Promise<string> {
  let secret: string;
  let expiresIn: string; // zeit/ms. Eg: 60, "2 days", "10h", "7d"

  // set the default config
  if (variant === 'access') {
    secret = <string>ACCESS_TOKEN_SECRET;
    expiresIn = '1h';
  } else if (variant === 'refresh') {
    secret = <string>REFRESH_TOKEN_SECRET!;
    expiresIn = '3d';
  }

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secret,
      {
        expiresIn,
      },
      (e, token) => {
        if (e) {
          return reject(e);
        }

        resolve(token!);
      },
    );
  });
}

export function verifyToken(
  props: VerifyTokenProps,
): Promise<string | jwt.JwtPayload> {
  let SECRET: string;

  if (props.type === 'access') {
    SECRET = <string>ACCESS_TOKEN_SECRET;
  } else {
    SECRET = <string>REFRESH_TOKEN_SECRET;
  }

  return new Promise((resolve, rejected) => {
    jwt.verify(props.token, SECRET, (e, payload) => {
      if (e) return rejected(e);
      resolve(payload!);
    });
  });
}
