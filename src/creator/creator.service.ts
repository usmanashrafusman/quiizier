import { RESPONSE_MESSAGES } from './../dtos/response.messages';
import { ERROR_CODES } from './../dtos/errors.code';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { RegisterCreator, LoginCreator } from './dtos/request';
import { Request, Response } from 'express';

@Injectable()
export class CreatorService {
  constructor(private prismaService: PrismaService, private authService: AuthService) { }
  async registerCreator(body: RegisterCreator, res: Response) {
    const isExist = await this.prismaService.creators.findUnique({
      where: {
        email: body.email
      }
    });
    if (isExist) {
      throw new BadRequestException(ERROR_CODES.USER_ALREADY_EXIST);
    }

    const hashPassword = await this.authService.generateHash(body.password)
    const newCreator = await this.prismaService.creators.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashPassword
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });
    const token = this.authService.generateToken(newCreator)
    res.cookie("Authorization", token, {
      httpOnly: true,
      maxAge: 28800000,
    });
    return {
      data: newCreator,
      messages: [{
        code: 200,
        message: RESPONSE_MESSAGES.REGISTRATION_SUCCESSFUL
      }]
    };
  }

  async loginCreator(body: LoginCreator, res: Response) {
    const isExist = await this.prismaService.creators.findUnique({
      where: {
        email: body.email
      }
    });
    if (!isExist) {
      throw new BadRequestException(ERROR_CODES.USER_DOES_NOT_EXIST);
    }
    const isValidPassword = await this.authService.comparePassword(body.password, isExist.password);
    if (!isValidPassword) {
      throw new BadRequestException(ERROR_CODES.INVALID_PASSWORD);
    }
    const user = {
      id: isExist.id,
      name: isExist.name,
      email: isExist.email
    }
    const token = this.authService.generateToken(user)
    res.cookie("Authorization", token, {
      httpOnly: true,
      maxAge: 28800000,
    });
    return {
      data: user,
      messages: [{
        code: 200,
        message: RESPONSE_MESSAGES.LOGIN_SUCCESSFUL
      }]
    }
  }

}