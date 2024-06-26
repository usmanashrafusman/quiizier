import { BadRequestException, Injectable } from '@nestjs/common';

import { IUser, IQuiz } from "src/schemas"
import { QuizRepository } from 'src/repository';
import { RESPONSE_MESSAGES } from 'src/common';

import { CreateQuiz } from './dtos/request';
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

    if (!quiz) {
      throw new BadRequestException(RESPONSE_MESSAGES.ERROR_WHILE_CREATING_QUIZ)
    }

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
    if (!quiz) {
      throw new BadRequestException(RESPONSE_MESSAGES.QUIZ_NOT_FOUND)
    }
    return {
      data: quiz,
      messages: []
    };
  }

}