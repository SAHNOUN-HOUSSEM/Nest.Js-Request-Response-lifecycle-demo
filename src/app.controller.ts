import { Body, Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { User } from './types';
import { CurrentUser, Roles } from './decorators';
import { Role } from './enums';
import { RolesGuard } from './guards';
import { UserDto } from './dtos';
import { FreezePipe } from './pipes';

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

  @Roles(Role.Admin)
  // @UseGuards(RolesGuard)
  @Get("/protected/admin")
  admin() {
    return `hello, admin`
  }

  @Roles(Role.User)
  // @UseGuards(RolesGuard)
  @Get("/protected/user")
  user() {
    return `hello, user`
  }

  @Get("/protected/pipes")
  pipe(
    @Body(new FreezePipe()) userDto: UserDto
  ) {
    userDto.password = "ss"
    return `pipe`
  }

  @Get('/:id')
  getHelloId(
    @Param("id") id: string
  ): string {
    return `hello, ${id}`
  }

}
