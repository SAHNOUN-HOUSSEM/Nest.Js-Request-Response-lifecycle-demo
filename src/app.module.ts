import { ConsoleLogger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationMiddleware, IsValidIdMiddleware } from './middlewares';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes("/protected", "/protected/*")
      .apply(IsValidIdMiddleware)
      .exclude("/protected")
      .forRoutes(
        { method: RequestMethod.GET, path: "/:id" }
      )
  }
}
