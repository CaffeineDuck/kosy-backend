import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUserPayload } from 'src/modules/auth/entities/jwtPayload.entity';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: JwtUserPayload = request.user;
    return user;
  },
);
