import { Module } from '@nestjs/common';
import { UserRepositoryModule, SessionRepositoryModule } from 'src/repository';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
@Module({
    imports: [UserRepositoryModule, SessionRepositoryModule],
    providers: [AuthService],
    controllers: [AuthController]
})

export class AuthModule { };