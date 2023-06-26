import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Request } from 'express';

import { APP_ENVIRONMENTS } from 'src/common';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class RequestResponseInterceptor implements NestInterceptor {
    constructor(private utilsService: UtilsService) { }
    async intercept(context: ExecutionContext, next: CallHandler) {
        const request: Request = context.switchToHttp().getRequest();
        if (request.body && request.body?.data && this.utilsService.APP_ENV === APP_ENVIRONMENTS.PROD) {
            request.body.data = this.utilsService.decryptData(request.body.data);
        };

        return next.handle().pipe(map(async (response) => {
            if (response?.data && this.utilsService.APP_ENV === APP_ENVIRONMENTS.PROD) {
                response.data = this.utilsService.encryptData(response.data);
            }
            return response;
        }));
    }
}