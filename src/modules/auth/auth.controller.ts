import { Body, Controller, Post } from "@nestjs/common";

import { IsPublicRoute } from "@/common/decorators/is-public-route";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";

@IsPublicRoute()
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post("sign-in")
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
