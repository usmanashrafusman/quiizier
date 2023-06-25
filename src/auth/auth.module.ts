import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { UserModel, UserSchema, SessionsModel, SessionsSchema } from "src/schemas"
import { AuthService } from './auth.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]), MongooseModule.forFeature([{ name: SessionsModel.name, schema: SessionsSchema }])],
    providers: [AuthService],
    controllers: [AuthController]
})

export class AuthModule { };