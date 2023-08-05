import jwt from 'jsonwebtoken';

type TokenType = 'access' | 'refresh';

type TokenConfig = {
  variant: TokenType;
  payload: string | object | Buffer;
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
    secret = process.env.ACCESS_TOKEN_SECRET!;
    expiresIn = '1h';
  } else if (variant === 'refresh') {
    secret = process.env.REFRESH_TOKEN_SECRET!;
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
