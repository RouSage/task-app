import express, { NextFunction, Request, Response } from 'express';
import multer from 'multer';

import { isAuthenticated } from '@modules/auth/auth.middleware';
import { IAuthRequest } from '@modules/auth/auth.types';
import { checkIfIncludes } from '@utils';

import { AVATAR_REGEX, User, VALID_UPDATES } from './user.model';

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

//
// GET user's info (profile)
//
router.get('/me', isAuthenticated, async (req: IAuthRequest, res) => {
  res.send(req.user);
});

//
// UPDATE User
//
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

//
// DELETE User
//
router.delete('/me', isAuthenticated, async (req: IAuthRequest, res) => {
  const { user } = req;

  try {
    await user?.remove();

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

//
// UPLOAD user avatar
//
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
  // https://github.com/expressjs/generator/issues/78
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(400).send({ error: err.message });
  }
);

//
// DELETE user avatar
//
router.delete('/me/avatar', isAuthenticated, async (req: IAuthRequest, res) => {
  const { user } = req;

  try {
    user?.set({ avatar: null });
    await user?.save();

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

//
// GET user avatar
//
router.get('/:id/avatar', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.setHeader('Content-Type', 'image/jpg');
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send(error);
  }
});

export default router;
