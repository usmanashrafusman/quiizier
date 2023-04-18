import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';

import { UserModel } from 'src/schemas/user.schema';
import { AuthService } from 'src/auth/auth.service';

import { RegisterUser, LoginUser } from './dtos/request';
import { RESPONSE_MESSAGES } from '../dtos/response.messages';
import { ERROR_CODES } from '../dtos/errors.code';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel.name) private userModel: Model<UserModel>, private authService: AuthService) { }
  async registerUser(body: RegisterUser, res: Response) {
    const isExist = await this.userModel.findOne({ email: body.email })

    if (isExist) {
      throw new BadRequestException(ERROR_CODES.USER_ALREADY_EXIST);
    }

    const hashPassword = await this.authService.generateHash(body.password);
    const newUser = await this.userModel.create({
      name: body.name,
      email: body.email,
      password: hashPassword
    });

    const user = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email
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
        message: RESPONSE_MESSAGES.REGISTRATION_SUCCESSFUL
      }]
    };
  }

  async loginUser(body: LoginUser, res: Response) {

    const isExist = await this.userModel.findOne({ email: body.email })

    if (!isExist) {
      throw new BadRequestException(ERROR_CODES.USER_DOES_NOT_EXIST);
    }

    const isValidPassword = await this.authService.comparePassword(body.password, isExist.password);
    if (!isValidPassword) {
      throw new BadRequestException(ERROR_CODES.INVALID_PASSWORD);
    };

    const user = {
      _id: isExist._id,
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