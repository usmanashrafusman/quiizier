//Modules Imports
import { PrismaModule } from "./prisma/prisma.module";

//Controller Imports
import { AppController } from "./app.controller";

//Services Imports
import { AppService } from './app.service';


export const Imports = [PrismaModule]
export const Controllers = [AppController]
export const Services = [AppService]