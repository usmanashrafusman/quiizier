import { Controller, Post, Body } from '@nestjs/common';
import { ResponseDto } from 'src/dtos/response.dto';
import { QuizService } from './quiz.service';
import { CreateQuiz } from './dtos/request';
import { IQuiz } from 'src/schemas';

@Controller("quiz")
export class QuizController {
  constructor(private readonly userService: QuizService) { }

  @Post("create")
  async registerUser(@Body("data") body: CreateQuiz): Promise<ResponseDto<IQuiz>> {
    const quiz: ResponseDto<IQuiz> = await this.userService.createQuiz(body);
    return quiz;
  }

}
