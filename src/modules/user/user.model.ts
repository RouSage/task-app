import bcrypt from 'bcryptjs';
import { model, Schema, HydratedDocument } from 'mongoose';
import validator from 'validator';

const PASSWORD_REGEXP = /password/i;
const SALT_FACTOR = 8;

interface User {
  name: string;
  email: string;
  password: string;
  age?: number;
  createdAt: Date;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate: (value: string) => {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate: (value: string) => {
        if (PASSWORD_REGEXP.test(value)) {
          throw new Error('Password cannot contain "password"');
        }
      },
    },
    age: {
      type: Number,
      default: null,
      validate: (value: number) => {
        if (value < 0) {
          throw new Error('Age must be a positive number');
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<HydratedDocument<User>>('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, SALT_FACTOR);
  }

  next();
});

export const UserModel = model<User>('User', userSchema);
