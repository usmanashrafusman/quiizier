import { ValidateNested, IsOptional } from 'class-validator';
import { Type, Exclude } from 'class-transformer';

export class RequestDto<T> {
    @IsOptional()
    @ValidateNested()
    @Type(options => options.object.type)
    data: T
}
