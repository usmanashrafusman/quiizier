import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { Imports, Controllers, Services } from './app.imports';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: Imports,
  controllers: Controllers,
  providers: Services,
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware).exclude({
        path: '/creator/register',
        method: RequestMethod.POST,
      }, {
        path: '/creator/login',
        method: RequestMethod.POST,
      }).forRoutes('/');
  }
}
