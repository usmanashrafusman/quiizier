import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';

import { UserModel, SessionsModel, } from "src/schemas"
import { AuthService } from 'src/auth/auth.service';
import { EmailService } from 'src/email/email.service';
import { RegisterUser, LoginUser } from './dtos/request';
import { RESPONSE_MESSAGES } from '../dtos/response.messages';
import { ERROR_CODES } from '../dtos/errors.code';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel.name) private userModel: Model<UserModel>, @InjectModel(SessionsModel.name) private sessionsModel: Model<SessionsModel>, private authService: AuthService, private emailService: EmailService, private configService: ConfigService) { }

  async registerUser(body: RegisterUser) {
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

    const HTML = `<p>Click Below To Verify Your Email<p> <a href=${this.configService.get("FRONTEND_URL")}user/verify-user/${verificationToken}>Verify Email</a>`

    const verificationEmail = await this.emailService.sendEmail(body.email, "Email Verification Required", "Please Click Below Link to Verify Your Email", HTML);
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

  async loginUser(body: LoginUser, visitorId: string, res: Response) {

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
    //making all previous sessions expired
    await this.sessionsModel.updateMany({ userId: user._id }, { $set: { status: false } })

    const token = this.authService.generateToken({ ...user, visitorId });
    //adding the token into sessions
    const encryptedToken = this.authService.encryptData(token);
    const encryptedVisitorId = this.authService.encryptData(visitorId);
    console.log(token , "Sending token");
    await this.sessionsModel.create({
      token,
      visitorId,
      userId: user._id
    })
    res.cookie("Authorization", encryptedToken, {
      httpOnly: true,
      maxAge: 28800000,
    });

    res.cookie("visitorId", encryptedVisitorId, {
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