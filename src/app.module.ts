import { Module } from '@nestjs/common';
import { Imports, Controllers, Services } from './app.imports';
import { CreatorModule } from './creator/creator.module';


@Module({
  imports: Imports,
  controllers: Controllers,
  providers: Services,
})

export class AppModule { }
