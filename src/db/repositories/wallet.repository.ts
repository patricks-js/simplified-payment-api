import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class WalletRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deposit(userId: number, amount: number) {
    return this.prisma.wallet.update({
      where: { userId },
      data: { balance: { increment: amount } },
    });
  }
}
