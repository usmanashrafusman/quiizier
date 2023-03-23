import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import { sign  , verify} from 'jsonwebtoken';
import { hash, compare } from 'bcryptjs';
const SECRET_KEY = "123"
@Injectable()
export class AuthService {

  generateToken(data: any): string {
    const token = sign(data, SECRET_KEY, { expiresIn: '8h' });
    return token;
  };

  decodeToken(token: string) {
    const decoded = verify(token, SECRET_KEY);
    return decoded;
  }

  async generateHash(plainText: string): Promise<string> {
    return await hash(plainText, 12);
  }

  async comparePassword(plainText: string, hash: string): Promise<boolean> {
    return await compare(plainText, hash)
  }


}
