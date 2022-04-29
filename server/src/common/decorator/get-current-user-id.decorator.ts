import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUserId = createParamDecorator(
  (_data: unknown, context: ExecutionContext): number => {
    // middleware를거치고 guard를 거치고 req.body에 있으면 그거 반환
    const req = context.switchToHttp().getRequest();
    return req.body.userId;
  },
);
