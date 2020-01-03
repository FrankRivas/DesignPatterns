import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class NewsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): void {
    // New York Times only support paginations <= 200
    if (req.query.page > 200) {
      throw new BadRequestException('The pagination must be < 200');
    }
    next();
  }
}
