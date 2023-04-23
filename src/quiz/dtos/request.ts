import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsDateString } from 'class-validator';

export class CreateQuiz {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsBoolean()
    isPublic: boolean

    @IsOptional()
    @IsBoolean()
    isPeriodRunning: boolean

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    publicAccessKey: string

    @IsOptional()
    @IsNotEmpty()
    @IsDateString()
    endTime: Date;

}
