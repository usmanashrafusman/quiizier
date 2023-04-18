//Modules Imports
import { DatabaseModule } from "./db/db.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";

//Controller Imports
import { AppController } from "./app.controller";

//Services Imports
import { AppService } from "./app.service";
import { EmailModule } from "./email/email.module";

export const Imports = [DatabaseModule, AuthModule, EmailModule, UserModule,]
export const Controllers = [AppController]
export const Services = [AppService]