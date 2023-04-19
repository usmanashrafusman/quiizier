import { InjectModel } from '@nestjs/mongoose';
import { ERROR_CODES } from './../dtos/errors.code';
import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AuthService } from 'src/auth/auth.service';
import { Model } from 'mongoose';
import { SessionsModel } from 'src/schemas';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService, @InjectModel(SessionsModel.name) private sessionsModel: Model<SessionsModel>) { }
    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies["Authorization"];
        if (!token) {
            throw new UnauthorizedException(ERROR_CODES.UNAUTHORIZED);
        }
        const user = this.authService.decodeToken(token);

        if (!user) {
            throw new UnauthorizedException(ERROR_CODES.UNAUTHORIZED);
        }

        const sessionToken = await this.sessionsModel.findOne({
            userId: user._id,
            token,
        });
        if (!sessionToken && !sessionToken?.status) {
            throw new UnauthorizedException(ERROR_CODES.UNAUTHORIZED);
        }
        next();
    }
}