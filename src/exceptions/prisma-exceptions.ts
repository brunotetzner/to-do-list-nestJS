import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptions implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const messageError = exception?.meta?.cause ?? exception.message;
    switch (exception.code) {
      case 'P2025':
        response
          .status(404)
          .json({
            statusCode: 404,
            message: messageError,
          })
          .send();
        break;
      case 'P2002':
        response
          .status(409)
          .json({
            statusCode: 409,
            message: 'Credentials already exists',
          })
          .send();
        break;
      default:
        response
          .status(500)
          .json({
            statusCode: 500,
            message: messageError,
          })
          .send();
    }
  }
}
