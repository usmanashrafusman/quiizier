//Modules Imports
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";

//Controller Imports
import { AppController } from "./app.controller";

//Services Imports
import { AppService } from './app.service';
import { CreatorModule } from "./creator/creator.module";


export const Imports = [PrismaModule, AuthModule, CreatorModule]
export const Controllers = [AppController]
export const Services = [AppService]