import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateQuiz } from './dtos/request';
import { QuizModel, IUser, IQuiz } from "src/schemas"
import { RESPONSE_MESSAGES } from '../dtos/response.messages';
import { ERROR_CODES } from 'src/dtos/errors.code';

@Injectable()
export class QuizService {
  constructor(@InjectModel(QuizModel.name) private quizModel: Model<QuizModel>) { }

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

    const quiz = await this.quizModel.create(quizData);
    return {
      data: quiz,
      messages: [{
        code: 200,
        message: RESPONSE_MESSAGES.QUIZ_CREATE
      }]
    };
  }

  async getAllQuizzes(user: IUser) {
    const quiz = await this.quizModel.find({
      createdBy: user._id
    });

    return {
      data: quiz,
      messages: []
    };
  }

  async getQuizById(quizId: string) {
    const quiz = await this.quizModel.findById(quizId);
    if (!quiz) {
      throw new BadRequestException(ERROR_CODES.QUIZ_NOT_FOUND)
    }
    return {
      data: quiz,
      messages: []
    };
  }

}