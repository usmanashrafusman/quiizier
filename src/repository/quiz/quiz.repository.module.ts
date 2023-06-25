import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizModel, QuizSchema } from "src/schemas"
import { QuizRepository } from './quiz.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: QuizModel.name, schema: QuizSchema }])],
    providers: [QuizRepository],
    exports: [QuizRepository]
})

export class QuizRepositoryModel { };