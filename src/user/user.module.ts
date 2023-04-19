import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema, SessionsModel, SessionsSchema } from "src/schemas"
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]), MongooseModule.forFeature([{ name: SessionsModel.name, schema: SessionsSchema }])],
    providers: [UserService],
    controllers: [UserController]
})

export class UserModule { };