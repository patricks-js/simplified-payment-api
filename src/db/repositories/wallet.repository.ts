import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class WalletRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: number) {
    return this.prisma.wallet.findUnique({
      where: { userId },
    });
  }

  async deposit(userId: number, amount: number) {
    return this.prisma.wallet.update({
      where: { userId },
      data: { balance: { increment: amount } },
    });
  }

  async getBalance(userId: number) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
      select: { balance: true },
    });
    return wallet?.balance;
  }
}
