import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { User } from "src/types";



@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const { password, username } = req.body
        if (!password)
            throw new BadRequestException("wrong credentials")
        if (password !== "123")
            throw new BadRequestException("wrong credentials")
        const user = new User()
        user.username = username
        user.roles = ["admin"]
        req.user = user
        next()
    }
}