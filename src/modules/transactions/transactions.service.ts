import { TransactionRepository } from "@/db/repositories/transaction.repository";
import { Injectable } from "@nestjs/common";
import { PerformTransactionDto } from "./dto/perform-transaction.dto";

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async perform(performTransactionDto: PerformTransactionDto) {
    return performTransactionDto;
  }
}
