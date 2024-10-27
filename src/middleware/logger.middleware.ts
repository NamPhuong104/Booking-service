import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const ipAddress = req.header('x-forwarded-for');
    console.log(`Request: ${req.method} ${req.originalUrl} from ${ipAddress}`);
    next();
  }
}
