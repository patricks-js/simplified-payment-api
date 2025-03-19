import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./common/guards/auth.guard";
import { PrismaModule } from "./db/prisma.module";
import { AuthModule } from "./modules/auth/auth.module";
import { WalletsModule } from "./modules/wallets/wallets.module";
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [AuthModule, PrismaModule, WalletsModule, TransactionsModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
