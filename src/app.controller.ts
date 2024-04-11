import { Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { User } from './types';
import { CurrentUser } from './decorators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get("/protected")
  protectedWithoutDecorator(
    @Req() req: Request
  ) {
    return `protected route, hello, ${req.user.username}`
  }

  @Get("/protected/with-decorator")
  protectedWithDecorator(
    @Req() req: Request,
    @CurrentUser() user: User
  ) {
    return `protected route, hello, ${req.user.username}`
  }

  @Get('/:id')
  getHelloId(
    @Param("id") id: string
  ): string {
    return `hello, ${id}`
  }

}
