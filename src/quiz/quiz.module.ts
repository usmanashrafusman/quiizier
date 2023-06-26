import { Module } from '@nestjs/common';

import { QuizRepositoryModel } from 'src/repository';

import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
@Module({
    imports: [QuizRepositoryModel],
    providers: [QuizService],
    controllers: [QuizController]
})

export class QuizModule { };