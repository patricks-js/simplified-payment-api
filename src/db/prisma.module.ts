import { Global, Module } from "@nestjs/common";

import { PrismaService } from "./prisma.service";
import { TransactionRepository } from "./repositories/transaction.repository";
import { UserRepository } from "./repositories/user.repository";
import { WalletRepository } from "./repositories/wallet.repository";

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepository,
    WalletRepository,
    TransactionRepository,
  ],
  exports: [UserRepository, WalletRepository, TransactionRepository],
})
export class PrismaModule {}
