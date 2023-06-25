import { Injectable } from '@nestjs/common';

import { CreateQuiz } from './dtos/request';
import { IUser, IQuiz } from "src/schemas"
import { RESPONSE_MESSAGES } from '../dtos/response.messages';
import { QuizRepository } from 'src/repository/quiz/quiz.repository';
@Injectable()
export class QuizService {
  constructor(private readonly quizRepository: QuizRepository) { }

  async createQuiz(body: CreateQuiz, user: IUser) {
    const quizData: IQuiz = {
      createdBy: user._id,
      name: body.name,
    }
    //if is public is false
    if (!body?.isPublic) {
      quizData.isPublic = body.isPublic
    }

    // if is period running is true
    if (body?.isPeriodRunning) {
      quizData.isPeriodRunning = body.isPeriodRunning
    }

    if (body?.startTime) {
      quizData.startTime = body.startTime
    }

    if (body?.endTime) {
      quizData.endTime = body.endTime
    }

    const quiz = await this.quizRepository.create(quizData);
    return {
      data: quiz,
      messages: [{
        code: 200,
        message: RESPONSE_MESSAGES.QUIZ_CREATE
      }]
    };
  }

  async getAllQuizzes(user: IUser) {
    const quiz = await this.quizRepository.queryAll({ createdBy: user._id });

    return {
      data: quiz,
      messages: []
    };
  }

  async getQuizById(quizId: string) {
    const quiz = await this.quizRepository.getById(quizId);
    return {
      data: quiz,
      messages: []
    };
  }

}