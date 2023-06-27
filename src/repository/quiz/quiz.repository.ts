import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuizModel, IQuiz } from "src/schemas"

@Injectable()
export class QuizRepository {
  constructor(@InjectModel(QuizModel.name) private quizModel: Model<QuizModel>) { }

  async getById(quizId: string) {
    const quiz = await this.quizModel.findById(quizId);
    return quiz;
  }

  async queryAll(query: object) {
    const quizzes = await this.quizModel.find(query);
    return quizzes;
  }

  async create(quizData: IQuiz) {
    const quiz = await this.quizModel.create(quizData);
    return quiz;
  }

}