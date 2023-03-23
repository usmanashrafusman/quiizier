import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { RequestDto } from 'src/dtos/request.dto';
import { ResponseDto } from 'src/dtos/response.dto';
import { CreatorService } from './creator.service';
import { RegisterCreator, LoginCreator } from './dtos/request';
import { CreatorResponse } from './dtos/response';
@Controller("creator")
export class CreatorController {
  constructor(private readonly creatorService: CreatorService) { }

  @Post("register")
  async registerCreator(@Body() body: RegisterCreator, @Res({ passthrough: true }) res: Response): Promise<ResponseDto<CreatorResponse>> {
    const creator: ResponseDto<CreatorResponse> = await this.creatorService.registerCreator(body, res);
    return creator;
  }

  @Post("login")
  async loginCreator(@Body() body: LoginCreator, @Res({ passthrough: true }) res: Response): Promise<ResponseDto<CreatorResponse>> {
    const creator: ResponseDto<CreatorResponse> = await this.creatorService.loginCreator(body, res);
    return creator;
  }

  @Get("get")
  async get() {
    return {}
  }
}
