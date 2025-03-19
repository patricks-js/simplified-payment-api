import { createParamDecorator, UnauthorizedException } from "@nestjs/common";

export const CurrentUserId = createParamDecorator<undefined>(async (_, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  const user = await request.user;

  if (!user) throw new UnauthorizedException();

  return user.sub;
});
