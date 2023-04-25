import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsDateString, IsMongoId } from 'class-validator';

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
    startTime: Date;

    @IsOptional()
    @IsNotEmpty()
    @IsDateString()
    endTime: Date;
}

export class GetQuiz {
    @IsMongoId({ message: "Invalid Input" })
    quizId: string
}
