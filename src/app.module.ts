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
        path: '/user/register',
        method: RequestMethod.POST,
      }, {
        path: '/user/login',
        method: RequestMethod.POST,
      }, {
        path: 'user/verify-user/:token',
        method: RequestMethod.GET,
      }).forRoutes('/');
  }
}
