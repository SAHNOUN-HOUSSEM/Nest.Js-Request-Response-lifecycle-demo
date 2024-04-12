import { ConsoleLogger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationMiddleware, IsValidIdMiddleware } from './middlewares';
import { RolesGuard } from './guards';
import { LoggingInterceptor } from './interceptors';
import { AllExceptionsFilter } from './filters';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: "APP_GUARD",
      useClass: RolesGuard
    },
    {
      provide: "APP_INTERCEPTOR",
      useClass: LoggingInterceptor
    },
    {
      provide: "APP_FILTER",
      useClass: AllExceptionsFilter
    }
  ],
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
