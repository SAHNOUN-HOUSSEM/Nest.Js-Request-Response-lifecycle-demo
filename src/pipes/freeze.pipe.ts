import { Injectable, Logger, LoggerService, PipeTransform } from '@nestjs/common';

@Injectable()
export class FreezePipe implements PipeTransform {
    private readonly logger: LoggerService
    constructor(
    ) {
        this.logger = new Logger(FreezePipe.name)
    }

    transform(value: any) {
        this.logger.debug('FreezePipe running...');

        Object.freeze(value);
        return value;
    }
}
