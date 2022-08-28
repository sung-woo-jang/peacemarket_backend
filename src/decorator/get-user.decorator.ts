import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/domain/users/entities/user.entity';

export const GetUser = createParamDecorator(
  (_, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    if (!req.user)
      throw new UnauthorizedException('로그인 후 이용할 수 있습니다.');
    return req.user;
  },
);
