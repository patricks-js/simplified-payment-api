import { ConflictException, Injectable } from "@nestjs/common";
import bcrypt from "bcryptjs";

import { UserRepository } from "@/db/repositories/user.repository";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(signUpDto: SignUpDto) {
    const emailTaken = await this.userRepository.findByEmail(signUpDto.email);

    if (emailTaken) {
      throw new ConflictException("Email already taken.");
    }

    const passwordHash = await bcrypt.hash(signUpDto.password, 10);

    const user = await this.userRepository.create({
      data: {
        name: signUpDto.name,
        email: signUpDto.email,
        document: signUpDto.document,
        passwordHash,
        type: signUpDto.type,
        Wallet: {
          create: {
            balance: 0,
          },
        },
      },
      omit: {
        passwordHash: true,
      },
      include: {
        Wallet: true,
      },
    });

    return {
      user,
    };
  }

  async signIn(signInDto: SignInDto) {}
}
