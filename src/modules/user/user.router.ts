import express, { NextFunction, Request, Response } from 'express';
import multer from 'multer';

import { isAuthenticated } from '@modules/auth/auth.middleware';
import { IAuthRequest } from '@modules/auth/auth.types';
import { checkIfIncludes } from '@utils';

import { AVATAR_REGEX, VALID_UPDATES } from './user.model';

const router = express.Router();
const upload = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(AVATAR_REGEX)) {
      cb(new Error('Please upload an image'));
      return;
    }

    cb(null, true);
  },
});

// Get the user's own info (profile)
router.get('/me', isAuthenticated, async (req: IAuthRequest, res) => {
  res.send(req.user);
});

// Update User
router.patch('/me', isAuthenticated, async (req: IAuthRequest, res) => {
  const { user, body } = req;

  const updates = Object.keys(body);
  const isValidOperation = checkIfIncludes(VALID_UPDATES, updates);

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates!' });
    return;
  }

  try {
    updates.forEach((update) => user?.set(update, req.body[update]));
    await user?.save();

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete User
router.delete('/me', isAuthenticated, async (req: IAuthRequest, res) => {
  const { user } = req;

  try {
    await user?.remove();

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Upload avatar
router.post(
  '/me/avatar',
  isAuthenticated,
  upload.single('avatar'),
  async (req: IAuthRequest, res: Response) => {
    const { user, file } = req;

    user?.set({ avatar: file?.buffer });
    await user?.save();

    res.send();
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(400).send({ error: err.message });
  }
);

export default router;
