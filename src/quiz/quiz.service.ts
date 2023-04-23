import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateQuiz } from './dtos/request';
import { QuizModel, IUser, } from "src/schemas"
import { RESPONSE_MESSAGES } from '../dtos/response.messages';

@Injectable()
export class QuizService {
  constructor(@InjectModel(QuizModel.name) private quizModel: Model<QuizModel>) { }

  async createQuiz(body: CreateQuiz, user: IUser) {
    const quiz = await this.quizModel.create({
      name: body.name,
      createdBy: user._id
    });
    return {
      data: quiz,
      messages: [{
        code: 200,
        message: RESPONSE_MESSAGES.QUIZ_CREATE
      }]
    };
  }

}