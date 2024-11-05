import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  constructor(private readonly configService: ConfigService) {}

  use(req: any, res: Response, next: NextFunction): void {
    const { method, originalUrl, headers, ip, query } = req;
    const start = Date.now();
    let user = null;
    let userId = null;
    let userEmail = null;
    const clientIp = req.headers['true-client-ip'] || ip;

    res.on('finish', async () => {
      const { statusCode } = res;
      const responseTime = Date.now() - start;

      this.logger.debug(
        `JobBoardAPI TRACE -- ${method} ${originalUrl} ${statusCode} - ${responseTime}ms`,
      );
      if (originalUrl == '/') return;

      const body = req.body;
      delete body?.password;
      const sanitizedHeaders = { ...headers };
      delete sanitizedHeaders.authorization;
      delete sanitizedHeaders.cookie;
    });

    next();
  }

  private getActionType(method: string, url: string): string {
    if (url === '/users' && method === 'POST') return 'register';
    if (url === '/users/login') return 'login';
    return `${method}: ${url}`;
  }
}
