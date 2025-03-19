import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserArgs: Prisma.UserCreateArgs) {
    return this.prisma.user.create(createUserArgs);
  }
}
