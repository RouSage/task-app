import { Express } from 'express';

/**
 * Typed "req.body"
 */
export interface IAuthRequestBody<T> extends Express.Request {
  body: T;
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
