import jwt from 'jsonwebtoken';

import authConfig from 'config/auth.config';

import { IJwtPayload } from './auth.types';

/**
 * Generate a JWT auth token given a user's ID
 */
export const generateAuthToken = (payload: IJwtPayload) =>
  jwt.sign(payload, authConfig.jwtSecret, { expiresIn: '7d' });
