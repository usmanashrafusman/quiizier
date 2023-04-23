import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AuthService } from 'src/auth/auth.service';
import { ERROR_CODES } from 'src/dtos/errors.code';
import { SessionsModel } from 'src/schemas';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService, @InjectModel(SessionsModel.name) private sessionsModel: Model<SessionsModel>) { }
    async use(req: Request, res: Response, next: NextFunction) {

        const token = req.cookies["Authorization"];
        const visitorId = req.cookies['visitorId'];

        if (!token || !visitorId) {
            throw new UnauthorizedException(ERROR_CODES.UNAUTHORIZED);
        }

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
        next();
    }
}