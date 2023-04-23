import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core'


//Modules Imports
import { DatabaseModule } from "./db/db.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { EmailModule } from "./email/email.module";
import { UtilsModules } from "./utils/utils.module";

//Services Imports
import { AppService } from "./app.service";

//Controller Imports
import { AppController } from "./app.controller";

//Configuration of ENV variables
import configuration from "./configuration";

//Interceptor Imports
import { RequestResponseInterceptor } from "./interceptors/request.response.interceptor";

//Schemas and Models
import { SessionsModel, SessionsSchema } from "./schemas";


const RequestResponse = {
    provide: APP_INTERCEPTOR,
    useClass: RequestResponseInterceptor
}

export const Imports = [ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration]
}), DatabaseModule, MongooseModule.forFeature([{ name: SessionsModel.name, schema: SessionsSchema }]), AuthModule, UtilsModules, EmailModule, UserModule,]

export const Controllers = [AppController]
export const Services = [AppService, RequestResponse]