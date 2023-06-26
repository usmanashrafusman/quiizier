import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { IUser } from "src/schemas"

export const CurrentUser = createParamDecorator((_, context: ExecutionContext): IUser => {
    const req = context.switchToHttp().getRequest()
    return req.user;
});