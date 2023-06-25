import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModel, UserSchema } from "src/schemas"
import { UserService } from './user.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }])],
    providers: [UserService],
    exports: [UserService]
})

export class UserModule { };