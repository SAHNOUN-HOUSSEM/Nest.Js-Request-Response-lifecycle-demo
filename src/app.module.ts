import { ConsoleLogger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IsValidIdMiddleware } from './middlewares';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsValidIdMiddleware)
      .forRoutes(
        { method: RequestMethod.GET, path: "/:id" }
      )
  }
}
