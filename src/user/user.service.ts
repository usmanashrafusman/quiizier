import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';

import { UserModel } from 'src/schemas/user.schema';
import { AuthService } from 'src/auth/auth.service';
import { EmailService } from 'src/email/email.service';
import { RegisterUser, LoginUser } from './dtos/request';
import { RESPONSE_MESSAGES } from '../dtos/response.messages';
import { ERROR_CODES } from '../dtos/errors.code';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel.name) private userModel: Model<UserModel>, private authService: AuthService, private emailService: EmailService) { }

  async registerUser(body: RegisterUser, res: Response) {
    const isExist = await this.userModel.findOne({ email: body.email })

    if (isExist) {
      throw new BadRequestException(ERROR_CODES.USER_ALREADY_EXIST);
    }

    const hashPassword = await this.authService.generateHash(body.password);
    const verificationToken = this.authService.generateToken({ email: body.email })

    const newUser = await this.userModel.create({
      name: body.name,
      email: body.email,
      password: hashPassword,
      verificationToken,
    });

    const verificationEmail = await this.emailService.sendEmail(body.email, "Email Verification Required", "Please Click Below Link to Verify Your Email");
    if (!verificationEmail) {
      throw new BadRequestException(ERROR_CODES.UNEXPECTED_ERROR);
    };

    return {
      data: { message: "Email Verification Required" },
      messages: [{
        code: 200,
        message: RESPONSE_MESSAGES.REGISTRATION_SUCCESSFUL
      }]
    };
  }

  async loginUser(body: LoginUser, res: Response) {

    const isExist = await this.userModel.findOne({ email: body.email })

    //If the user does not exist
    if (!isExist) {
      throw new BadRequestException(ERROR_CODES.USER_DOES_NOT_EXIST);
    }

    //if the user email is not verified
    if (!isExist.status) {
      throw new BadRequestException(ERROR_CODES.NOT_VERIFIED);
    }

    // if the password is not correct
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


  async verifyUser(verificationToken: string) {
    const user = await this.userModel.findOne({ verificationToken })
    //if the token is not expired

    //@ts-ignore
    const createdDate = new Date(user.createdAt).getTime();
    const milliseconds = new Date().getTime() - createdDate;
    const mins = Math.floor(milliseconds / 1000 / 60);

    if (mins > 30) {
      throw new BadRequestException(ERROR_CODES.TOKEN_EXPIRED);
    }

    await this.userModel.findByIdAndUpdate(user._id, { status: true });

    return {
      data: { message: "Email Verification Done" },
      messages: [{
        code: 200,
        message: RESPONSE_MESSAGES.EMAIL_VERIFICATION_SUCCESSFUL
      }]
    };
  }

}