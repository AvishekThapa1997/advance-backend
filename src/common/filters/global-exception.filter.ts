import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';
import type { APIError, APIFieldError, APIResult } from '../types/index.js';
import { SchemvalidationException } from '../exception/schema-validation.exception.js';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let fields: APIError['fields'];
    if (
      exception instanceof HttpException &&
      !(exception instanceof SchemvalidationException)
    ) {
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const resObj = res as Record<string, any>;
        if (Array.isArray(resObj.message)) {
          message = resObj.message.join(', ');
        } else if (typeof resObj.message === 'string') {
          message = resObj.message;
        } else if (typeof resObj.error === 'string') {
          message = resObj.error;
        }
      }
    } else if (exception instanceof SchemvalidationException) {
      message = exception.errorObj.message;
      fields = exception.errorObj.fields;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const errorResponse: APIResult<never> = {
      success: false,
      error: {
        message,
        code: status,
        fields,
      },
    };
    Logger.error('Exception filter: ', errorResponse);
    response.status(status).json(errorResponse);
  }
}
