import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ResponseDto } from 'src/dtos/response.dto';
import { QuizResponse } from './dtos/response';
import { QuizService } from './quiz.service';
import { CreateQuiz, GetQuiz } from './dtos/request';
import { IUser } from 'src/schemas';
import { CurrentUser } from 'src/interceptors';

@Controller("quiz")
export class QuizController {
constructor(private readonly quizService: QuizService) { }

@Post("create")
async createQuiz(@Body("data") body: CreateQuiz, @CurrentUser() user: IUser): Promise<ResponseDto<QuizResponse>> {
  const quiz: ResponseDto<QuizResponse> = await this.quizService.createQuiz(body, user);
  return quiz;
}

@Get()
async getAllQuizzes(@CurrentUser() user: IUser): Promise<ResponseDto<QuizResponse[]>> {
  const quizzes: ResponseDto<QuizResponse[]> = await this.quizService.getAllQuizzes(user);
  return quizzes;
}

@Get(":quizId")
async getQuizById(@Param() params: GetQuiz): Promise<ResponseDto<QuizResponse>> {
  const quiz: ResponseDto<QuizResponse> = await this.quizService.getQuizById(params.quizId);
  return quiz;
}


}
