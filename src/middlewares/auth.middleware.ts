import { ERROR_CODES } from './../dtos/errors.code';
import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService) { }
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies["Authorization"];
        if (!token) {
            throw new UnauthorizedException(ERROR_CODES.UNAUTHORIZED);
        }

        const user = this.authService.decodeToken(token);
        console.log(user)
        next();
    }
}