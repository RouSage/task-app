import { Response, NextFunction } from 'express';

import { User } from '@modules/user/user.model';

import { verifyAuthToken } from './auth.helper';
import { IAuthRequest, IJwtPayload } from './auth.types';

const TOKEN_TYPE = 'Bearer ';

export const isAuthenticated = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  const token = authorization?.slice(TOKEN_TYPE.length);

  if (!token) {
    res.status(401).send({ error: 'Please authenticate' });
    return;
  }

  try {
    const { _id } = verifyAuthToken(token) as IJwtPayload;

    const user = await User.findOne({ _id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};
