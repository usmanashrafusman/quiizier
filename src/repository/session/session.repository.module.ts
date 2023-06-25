import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SessionsModel, SessionsSchema } from "src/schemas"
import { SessionRepository } from './session.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: SessionsModel.name, schema: SessionsSchema }])],
    providers: [SessionRepository],
    exports: [SessionRepository]
})

export class SessionRepositoryModule { };