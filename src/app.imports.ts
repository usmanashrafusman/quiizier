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

export const Imports = [ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration]
}), DatabaseModule, AuthModule, EmailModule, UserModule,]
export const Controllers = [AppController]
export const Services = [AppService]