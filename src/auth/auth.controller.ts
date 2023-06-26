import { Controller, Post, Body, Res, Get, Param, Headers } from '@nestjs/common';
import { Response } from 'express';
import { ResponseDto } from 'src/dtos';

import { RegisterUser, LoginUser } from './dtos/request';
import { UserResponse, EmailVerificationResponse } from './dtos/response';
import { AuthService } from './auth.service';

@Controller("user")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("register")
  async registerUser(@Body("data") body: RegisterUser): Promise<ResponseDto<EmailVerificationResponse>> {
    const user: ResponseDto<EmailVerificationResponse> = await this.authService.registerUser(body);
    return user;
  }

  @Post("login")
  async loginUser(@Body("data") body: LoginUser, @Headers('visitorId') visitorId: string, @Res({ passthrough: true }) res: Response): Promise<ResponseDto<UserResponse>> {
    const user: ResponseDto<UserResponse> = await this.authService.loginUser(body, visitorId, res);
    return user;
  }

  @Get("verify-user/:token")
  async verifyUser(@Param("token") verificationToken: string): Promise<ResponseDto<EmailVerificationResponse>> {
    const user: ResponseDto<EmailVerificationResponse> = await this.authService.verifyUser(verificationToken);
    return user;
  }
}
