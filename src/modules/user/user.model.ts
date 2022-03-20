import { model, Schema } from 'mongoose';
import validator from 'validator';

const PASSWORD_REGEXP = /password/i;

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

export const UserModel = model<User>('User', userSchema);
