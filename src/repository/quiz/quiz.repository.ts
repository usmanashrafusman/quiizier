import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuizModel, IQuiz } from "src/schemas"
import { ERROR_CODES } from 'src/common';

@Injectable()
export class QuizRepository {
  constructor(@InjectModel(QuizModel.name) private quizModel: Model<QuizModel>) { }

  async getById(quizId: string) {
    const quiz = await this.quizModel.findById(quizId);
    if (!quiz) {
      throw new BadRequestException(ERROR_CODES.QUIZ_NOT_FOUND)
    }
    return quiz;
  }

  async queryAll(query:object){
    const quizzes = await this.quizModel.find(query);
    return quizzes;
  }

  async create(quizData: IQuiz) {
    const quiz = await this.quizModel.create(quizData);
    return quiz;
  }

}