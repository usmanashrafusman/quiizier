import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { QuizRepositoryModel } from 'src/repository/quiz/quiz.repository.module';
@Module({
    imports: [QuizRepositoryModel],
    providers: [QuizService],
    controllers: [QuizController]
})

export class QuizModule { };