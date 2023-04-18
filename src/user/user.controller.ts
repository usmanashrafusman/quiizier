import { Response } from 'express';
import { Controller, Post, Body, Res } from '@nestjs/common';
import { ResponseDto } from 'src/dtos/response.dto';
import { UserService } from './user.service';
import { RegisterUser, LoginUser } from './dtos/request';
import { UserResponse } from './dtos/response';

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("register")
  async registerUser(@Body() body: RegisterUser, @Res({ passthrough: true }) res: Response): Promise<ResponseDto<UserResponse>> {
    const user: ResponseDto<UserResponse> = await this.userService.registerUser(body, res);
    return user;
  }

  @Post("login")
  async loginUser(@Body() body: LoginUser, @Res({ passthrough: true }) res: Response): Promise<ResponseDto<UserResponse>> {
    const user: ResponseDto<UserResponse> = await this.userService.loginUser(body, res);
    return user;
  }

}
