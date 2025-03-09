import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string,
}

export const authenticateToken = (token: string) => {
  if (!token) {
    return null;
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || '';
    const user = jwt.verify(token.split(' ')[1], secretKey) as JwtPayload;
    return user;
  } catch {
    return null;
  }
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};
