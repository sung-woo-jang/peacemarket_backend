import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const stack = exception.stack;
    const error = exception.getResponse();

    if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException();
    }

    const log = {
      timestamp: new Date().toISOString(),
      url: req.url,
      error,
      stack,
      status,
    };
    this.logger.log(log);

    res.status(status).json({
      success: false,
      error,
    });
  }
}
