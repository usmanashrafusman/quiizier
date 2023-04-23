import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class RequestResponseInterceptor implements NestInterceptor {
    constructor(private authService: AuthService) { }
    async intercept(context: ExecutionContext, next: CallHandler) {
        const request: Request = context.switchToHttp().getRequest();
        if (request.body && request.body?.data) {
            request.body.data = this.authService.decryptData(request.body.data);
        };

        return next.handle().pipe(map(async (response) => {
            if (response?.data) {
                response.data = this.authService.encryptData(response.data);
            }
            return response;
        }));
    }
}