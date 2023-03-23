import { Controller, Get } from '@nestjs/common';
import { CreatorService } from './creator.service';

@Controller()
export class CreatorController {
  constructor(private readonly creatorService: CreatorService) { }

  @Get()
  getHello(): string {
    return this.creatorService.getHello();
  }
}
