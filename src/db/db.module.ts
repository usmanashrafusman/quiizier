import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://Usman:Respect++90@cluster0.ehpyv03.mongodb.net/test")]
})
export class DatabaseModule { }
