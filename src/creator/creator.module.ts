import { Module } from '@nestjs/common';
import { CreatorController } from './creator.controller';
import { CreatorService } from './creator.service';

@Module({
    providers: [CreatorService],
    controllers: [CreatorController]
})
export class CreatorModule { }
