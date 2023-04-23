import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { IUser } from "../schemas"

export const CurrentUser = createParamDecorator((data, context: ExecutionContext): IUser => {
    const req = context.switchToHttp().getRequest()
    return req.user;
});