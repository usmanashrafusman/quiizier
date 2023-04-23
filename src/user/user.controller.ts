import { Controller, Post, Body, Res, Get, Param, Headers } from '@nestjs/common';
import { Response } from 'express';
import { ResponseDto } from 'src/dtos/response.dto';
import { UserService } from './user.service';
import { RegisterUser, LoginUser } from './dtos/request';
import { UserResponse, EmailVerificationResponse } from './dtos/response';

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("register")
  async registerUser(@Body("data") body: RegisterUser): Promise<ResponseDto<EmailVerificationResponse>> {
    const user: ResponseDto<EmailVerificationResponse> = await this.userService.registerUser(body);
    return user;
  }

  @Post("login")
  async loginUser(@Body("data") body: LoginUser, @Headers('visitorId') visitorId: string, @Res({ passthrough: true }) res: Response): Promise<ResponseDto<UserResponse>> {
    const user: ResponseDto<UserResponse> = await this.userService.loginUser(body, visitorId, res);
    return user;
  }

  @Get("verify-user/:token")
  async verifyUser(@Param("token") verificationToken: string): Promise<ResponseDto<EmailVerificationResponse>> {
    const user: ResponseDto<EmailVerificationResponse> = await this.userService.verifyUser(verificationToken);
    return user;
  }
}
