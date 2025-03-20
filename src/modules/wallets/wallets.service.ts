import { WalletRepository } from "@/db/repositories/wallet.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { DepositDto } from "./dto/deposit.dto";

@Injectable()
export class WalletsService {
  constructor(private readonly walletRepository: WalletRepository) {}

  async deposit({ userId, amount }: DepositDto) {
    return this.walletRepository.deposit(userId, amount);
  }

  async findByUserId(userId: number) {
    const wallet = await this.walletRepository.findByUserId(userId);
    if (!wallet) {
      throw new NotFoundException(`Wallet not found for user ${userId}`);
    }

    return wallet;
  }

  async getBalance(userId: number) {
    const balance = await this.walletRepository.getBalance(userId);
    if (!balance) {
      throw new NotFoundException(`Wallet not found for user ${userId}`);
    }

    return balance;
  }
}
