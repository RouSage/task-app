import { Express, Request } from 'express';
import { HydratedDocument } from 'mongoose';

import { IUser } from '@modules/user/user.model';

/**
 * Typed "req.body"
 */
export interface IAuthRequestBody<T> extends Express.Request {
  body: T;
}
/**
 * Auth middleware request object that contains a user
 */
export interface IAuthRequest extends Request {
  token?: string;
  user?: HydratedDocument<IUser>;
}
/**
 * Payload passed into and decoded from JWT
 */
export interface IJwtPayload {
  _id: string;
}

/**
 * Payload to request the user's login
 */
export interface ILoginRequest {
  email: string;
  password: string;
}
