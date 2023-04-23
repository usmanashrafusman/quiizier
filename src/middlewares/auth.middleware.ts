import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AuthService } from 'src/auth/auth.service';
import { ERROR_CODES } from 'src/dtos/errors.code';
import { SessionsModel } from 'src/schemas';
import { IUser } from "src/schemas";

type ExpressRequest = Request & { user: IUser };

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService, @InjectModel(SessionsModel.name) private sessionsModel: Model<SessionsModel>) { }
    async use(req: ExpressRequest, res: Response, next: NextFunction) {

        let token = req.cookies["Authorization"];
        let visitorId = req.cookies['visitorId'];

        if (!token || !visitorId) {
            throw new UnauthorizedException(ERROR_CODES.UNAUTHORIZED);
        }

        token = decodeURIComponent(token);
        visitorId = decodeURIComponent(visitorId);

        token = await this.authService.decryptData(token);
        visitorId = await this.authService.decryptData(visitorId);

        const user = this.authService.decodeToken(token);
        if (!user) {
            throw new UnauthorizedException(ERROR_CODES.UNAUTHORIZED);
        }
        const sessionToken = await this.sessionsModel.findOne({
            token,
            visitorId,
            userId: user._id,
            status: true,
        });

        if (!sessionToken) {
            throw new UnauthorizedException(ERROR_CODES.UNAUTHORIZED);
        }
        req.user = user;
        next();
    }
}