import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string,
}

export const authenticateToken = ({ req }: any) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ').pop().trim();
    
    const secretKey = process.env.JWT_SECRET_KEY || '';

    try {
      const { data }: any = jwt.verify(token, secretKey);
      req.user = data as JwtPayload;
    } catch (err) {
      console.log('Invalid token');
    }
    
    return req;
  } else {
    return req;
  }
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign({ data: payload }, secretKey, { expiresIn: '1h' });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};

import { jwtDecode } from 'jwt-decode';

interface UserToken {
  name: string;
  exp: number;
}

class AuthService {
    getProfile() {
    return jwtDecode(this.getToken() || '');
  }

    loggedIn() {
       const token = this.getToken();
    return !!token && !this.isTokenExpired(token); 
  }

    isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<UserToken>(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } 
      
      return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
       return localStorage.getItem('id_token');
  }

  login(idToken: string) {
       localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
  }
}

export default new AuthService();