//Modules Imports
import { DatabaseModule } from "./db/db.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ConfigModule } from '@nestjs/config';

//Controller Imports
import { AppController } from "./app.controller";

//Configuration of ENV variables
import configuration from "./configuration";

//Services Imports
import { AppService } from "./app.service";
import { EmailModule } from "./email/email.module";
import { MongooseModule } from "@nestjs/mongoose";
import { SessionsModel, SessionsSchema } from "./schemas";

import { APP_INTERCEPTOR } from '@nestjs/core'

import { RequestResponseInterceptor } from "./interceptors/request.response.interceptor";

const RequestResponse = {
    provide: APP_INTERCEPTOR,
    useClass: RequestResponseInterceptor
}

export const Imports = [ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration]
}), DatabaseModule, MongooseModule.forFeature([{ name: SessionsModel.name, schema: SessionsSchema }]), AuthModule, EmailModule, UserModule,]

export const Controllers = [AppController]
export const Services = [AppService, RequestResponse]