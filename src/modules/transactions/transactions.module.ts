import { TransactionAuthorizerModule } from "@/services/transaction-authorizer/transaction-authorizer.module";
import { Module } from "@nestjs/common";
import { WalletsModule } from "../wallets/wallets.module";
import { TransactionsController } from "./transactions.controller";
import { TransactionsService } from "./transactions.service";

@Module({
  imports: [WalletsModule, TransactionAuthorizerModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
