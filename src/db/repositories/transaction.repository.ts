import { PrismaService } from "../prisma.service";

export class TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

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
