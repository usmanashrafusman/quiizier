import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { hash, compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { AES, enc } from "crypto-js"
import { isValidJSON } from 'src/utils';
@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {
  }
  generateToken(data: any): string {
    const token = sign(data, this.configService.get("SECRET_KEY"), { expiresIn: '8h' });
    return token;
  };

  decodeToken(token: string) {
    const decoded: any = verify(token, this.configService.get("SECRET_KEY"));
    return decoded;
  }

  async generateHash(plainText: string): Promise<string> {
    return await hash(plainText, 12);
  }

  async comparePassword(plainText: string, hash: string): Promise<boolean> {
    return await compare(plainText, hash)
  }

  encryptData(plainData: any): string {
    const data = JSON.stringify({ data: plainData });
    const encryptedData = AES.encrypt(data, this.configService.get("CRYPTO_SECRET_KEY")).toString();
    return encryptedData;
  };

  decryptData(data: string): any {
    const dataWordArray = AES.decrypt(data, this.configService.get("CRYPTO_SECRET_KEY"));
    let decryptedData: any = dataWordArray.toString(enc.Utf8);

    if(isValidJSON(decryptedData)){
      decryptedData = JSON.parse(decryptedData)
    }

    if (decryptedData?.data) {
      return decryptedData.data
    }
    return decryptedData;
  }

}
