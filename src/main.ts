import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

(async()=>{
  const PORT = 9999;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
})()
