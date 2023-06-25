import { Module } from '@nestjs/common';
import { SessionRepositoryModule } from 'src/repository/session/session.repository.module';
import { UserRepositoryModule } from 'src/repository/user/user.repository.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
@Module({
    imports: [UserRepositoryModule, SessionRepositoryModule],
    providers: [AuthService],
    controllers: [AuthController]
})

export class AuthModule { };