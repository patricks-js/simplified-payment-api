import { Global, Module } from "@nestjs/common";

import { PrismaService } from "./prisma.service";
import { UserRepository } from "./repositories/user.repository";
import { WalletRepository } from "./repositories/wallet.repository";

@Global()
@Module({
  providers: [PrismaService, UserRepository, WalletRepository],
  exports: [UserRepository, WalletRepository],
})
export class PrismaModule {}
