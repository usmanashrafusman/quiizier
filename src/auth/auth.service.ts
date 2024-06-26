import { BadRequestException, UnauthorizedException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

import { UtilsService } from 'src/utils/utils.service';
import { EmailService } from 'src/email/email.service';
import { RESPONSE_MESSAGES, ERROR_CODES } from 'src/common';

import { SessionRepository, UserRepository } from 'src/repository';

import { RegisterUser, LoginUser } from './dtos/request';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository, private readonly sessionRepository: SessionRepository, private utilsService: UtilsService, private emailService: EmailService, private configService: ConfigService) { }

  async registerUser(body: RegisterUser) {
    const isExist = await this.userRepository.findOneByEmail(body.email);

    if (isExist) {
      throw new BadRequestException(ERROR_CODES.USER_ALREADY_EXIST);
    }

    const hashPassword = await this.utilsService.generateHash(body.password);
    const verificationToken = this.utilsService.generateToken({ email: body.email })

    await this.userRepository.register({
      name: body.name,
      email: body.email,
      password: hashPassword,
      verificationToken,
    })

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

    const isExist = await this.userRepository.findOneByEmail(body.email);
    //If the user does not exist
    if (!isExist) {
      throw new BadRequestException(ERROR_CODES.USER_DOES_NOT_EXIST);
    }

    //if the user email is not verified
    if (!isExist.status) {
      throw new BadRequestException(ERROR_CODES.NOT_VERIFIED);
    }

    // if the password is not correct
    const isValidPassword = await this.utilsService.comparePassword(body.password, isExist.password);
    if (!isValidPassword) {
      throw new BadRequestException(ERROR_CODES.INVALID_PASSWORD);
    };

    const user = {
      _id: isExist._id,
      name: isExist.name,
      email: isExist.email
    }
    //making all previous sessions expired
    await this.sessionRepository.expirePreviousSessions(user._id)

    const token = this.utilsService.generateToken({ ...user, visitorId });

    //adding the token into sessions
    const encryptedToken = this.utilsService.encryptData(token);
    const encryptedVisitorId = this.utilsService.encryptData(visitorId);

    const newSession = await this.sessionRepository.createNewSession({
      token,
      visitorId,
      userId: user._id
    })

    if (!newSession) {
      throw new BadRequestException(RESPONSE_MESSAGES.ERROR_WHILE_LOGGING_IN)
    }

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
    const user = await this.userRepository.findOne({ verificationToken })
    //if the token is not expired

    if(!user){
      throw new UnauthorizedException(RESPONSE_MESSAGES.UNAUTHORIZE_USER)
    }

    //@ts-ignore
    const createdDate = new Date(user.createdAt).getTime();
    const milliseconds = new Date().getTime() - createdDate;
    const mins = Math.floor(milliseconds / 1000 / 60);

    if (mins > 30) {
      throw new BadRequestException(ERROR_CODES.TOKEN_EXPIRED);
    }

    await this.userRepository.findByIdAndUpdate(user._id, { status: true });

    return {
      data: { message: "Email Verification Done" },
      messages: [{
        code: 200,
        message: RESPONSE_MESSAGES.EMAIL_VERIFICATION_SUCCESSFUL
      }]
    };
  }

}