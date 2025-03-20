import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Wallet } from "@prisma/client";

type TransactionOperationInput = {
  amount: number;
  walletId: number;
  userId: number;
};

@Injectable()
export class TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async debit({ amount, walletId, userId }: TransactionOperationInput) {
    const wallet = await this.prisma.wallet.findUnique({
      where: {
        id: walletId,
        userId,
      },
    });

    if (!wallet) {
      throw new Error("Wallet not found");
    }

    return this.prisma.wallet.update({
      where: {
        id: walletId,
      },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });
  }

  async credit({ amount, walletId, userId }: TransactionOperationInput) {
    const wallet = await this.prisma.wallet.findUnique({
      where: {
        id: walletId,
        userId,
      },
    });

    if (!wallet) {
      throw new Error("Wallet not found");
    }

    return this.prisma.wallet.update({
      where: {
        id: walletId,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    });
  }

  async rollback(debitWallet: Wallet, creditWallet: Wallet, amount: number) {
    await this.prisma.wallet.update({
      where: {
        id: debitWallet.id,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    await this.prisma.wallet.update({
      where: {
        id: creditWallet.id,
      },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });
  }

  async register({
    amount,
    walletId,
    senderId,
    receiverId,
  }: {
    amount: number;
    walletId: number;
    senderId: number;
    receiverId: number;
  }) {
    return this.prisma.transaction.create({
      data: {
        amount,
        walletId,
        senderId,
        receiverId,
      },
    });
  }
}
