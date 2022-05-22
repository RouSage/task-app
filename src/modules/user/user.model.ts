import bcrypt from 'bcryptjs';
import { Model, model, Schema, HydratedDocument, Types } from 'mongoose';
import validator from 'validator';

const PASSWORD_REGEXP = /password/i;
const SALT_FACTOR = 8;

/**
 * Type to store the user's auth token
 */
interface IAuthToken {
  token: string;
}

/**
 * User model definition
 */
export interface IUser {
  name: string;
  email: string;
  password: string;
  age?: number;
  tokens: Types.Array<IAuthToken>;
  createdAt: Date;
  updatedAt: Date;
}

//
// User model's static methods definition
//
interface UserModel extends Model<IUser> {
  findByCredentials(
    email: string,
    password: string
  ): Promise<HydratedDocument<IUser>>;
}

//
// Schema
//
const userSchema = new Schema<IUser, UserModel>(
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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//
// Static methods
//
userSchema.static(
  'findByCredentials',
  async function findByCredentials(email: string, password: string) {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Unable to login');
    }

    return user;
  }
);

//
// Hooks
//
userSchema.pre<HydratedDocument<IUser>>('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, SALT_FACTOR);
  }

  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
