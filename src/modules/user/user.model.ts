import { model, Schema } from 'mongoose';
import validator from 'validator';

interface User {
  name: string;
  email: string;
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
    age: {
      type: Number,
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
