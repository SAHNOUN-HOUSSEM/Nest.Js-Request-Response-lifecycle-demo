import { BadRequestException, Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class IsValidIdMiddleware implements NestMiddleware {
    private readonly logger: Logger

    constructor(
    ) {
        this.logger = new Logger(IsValidIdMiddleware.name)
    }

    use(req: Request, res: Response, next: NextFunction) {
        this.logger.log("inside IsValidIdMiddleware")
        const { id } = req.params
        console.log(req.params);

        if (id && !isNumber(id)) {
            throw new BadRequestException("id must be a number")
        }
        next()
    }
}

function isNumber(string) {
    return /^[0-9]*$/.test(string);
}