import { Controller, Post, Body } from '@nestjs/common';
import { ResponseDto } from 'src/dtos/response.dto';
import { QuizService } from './quiz.service';
import { CreateQuiz } from './dtos/request';
import { IQuiz, IUser } from 'src/schemas';
import { CurrentUser } from 'src/interceptors';

@Controller("quiz")
export class QuizController {
  constructor(private readonly userService: QuizService) { }

  @Post("create")
  async registerUser(@Body("data") body: CreateQuiz, @CurrentUser() user: IUser): Promise<ResponseDto<IQuiz>> {
    const quiz: ResponseDto<IQuiz> = await this.userService.createQuiz(body, user);
    return quiz;
  }

}
