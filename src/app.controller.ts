import { Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get("/protected")
  protected(
    @Req() req: Request
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
