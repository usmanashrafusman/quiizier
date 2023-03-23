import { Injectable } from '@nestjs/common';

@Injectable()
export class CreatorService {
  getHello(): string {
    return 'Hello World!';
  }
}
