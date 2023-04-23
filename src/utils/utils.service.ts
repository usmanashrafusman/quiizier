import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  constructor() { }

  isValidJSON(value: any): boolean {
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      return false;
    }
  }

}
