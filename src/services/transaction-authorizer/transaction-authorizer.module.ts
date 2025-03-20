import { Module } from "@nestjs/common";
import { TransactionAuthorizerService } from "./transaction-authorizer.service";

@Module({
  providers: [TransactionAuthorizerService],
  exports: [TransactionAuthorizerService],
})
export class TransactionAuthorizerModule {}
