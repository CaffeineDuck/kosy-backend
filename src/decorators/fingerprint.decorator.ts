import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const FingerPrint = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    const fingerPrint = request.headers?.fingerprint;

    if (!fingerPrint || fingerPrint.length != 32) {
      return
    }
    return fingerPrint;
  },
);
