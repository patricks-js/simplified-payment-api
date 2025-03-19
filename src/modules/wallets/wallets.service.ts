import { WalletRepository } from "@/db/repositories/wallet.repository";
import { Injectable } from "@nestjs/common";
import { DepositDto } from "./dto/deposit.dto";

@Injectable()
export class WalletsService {
  constructor(private readonly walletRepository: WalletRepository) {}

  async deposit({ userId, amount }: DepositDto) {
    return this.walletRepository.deposit(userId, amount);
  }
}
