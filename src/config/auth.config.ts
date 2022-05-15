/**
 * Authentication config
 *
 * @property {string} jwtSecret='changeme' - JWT secret.
 */
const authConfig = {
  jwtSecret: process.env.JWT_SECRET || 'jwtsecret',
};

export default authConfig;
