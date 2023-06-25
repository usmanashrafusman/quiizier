import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModel, UserSchema } from "src/schemas"
import { UserRepository } from './user.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }])],
    providers: [UserRepository],
    exports: [UserRepository]
})

export class UserRepositoryModule { };