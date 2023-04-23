import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizModel, QuizSchema } from "src/schemas"
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: QuizModel.name, schema: QuizSchema }])],
    providers: [QuizService],
    controllers: [QuizController]
})

export class QuizModule { };