import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { hash, compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
const SECRET_KEY = "123"
@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {
  }
  generateToken(data: any): string {
    const token = sign(data, this.configService.get("SECRET_KEY"), { expiresIn: '8h' });
    return token;
  };

  decodeToken(token: string) {
    const decoded = verify(token, this.configService.get("SECRET_KEY"));
    return decoded;
  }

  async generateHash(plainText: string): Promise<string> {
    return await hash(plainText, 12);
  }

  async comparePassword(plainText: string, hash: string): Promise<boolean> {
    return await compare(plainText, hash)
  }


}
