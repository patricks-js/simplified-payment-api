import { TransactionRepository } from "@/db/repositories/transaction.repository";
import { TransactionAuthorizerService } from "@/services/transaction-authorizer/transaction-authorizer.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { WalletsService } from "../wallets/wallets.service";
import { PerformTransactionDto } from "./dto/perform-transaction.dto";

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly walletService: WalletsService,
    private readonly transactionAuthorizerService: TransactionAuthorizerService,
  ) {}

  async perform(performTransactionDto: PerformTransactionDto) {
    const { amount, receiverId, senderId } = performTransactionDto;

    if (senderId === receiverId) {
      throw new BadRequestException("Sender and receiver cannot be the same");
    }

    // TODO: Validate user type. Only users of type 'customer' can perform transactions.

    const senderWallet = await this.walletService.findByUserId(senderId);
    const senderBalance = await this.walletService.getBalance(senderId);

    const senderHasSufficientBalance = senderBalance.comparedTo(amount) >= 0;
    if (!senderHasSufficientBalance) {
      throw new BadRequestException("Insufficient balance");
    }

    const receiverWallet = await this.walletService.findByUserId(receiverId);

    const debitSenderWallet = await this.transactionRepository.debit({
      amount,
      walletId: senderWallet.id,
      userId: senderId,
    });

    const creditReceiverWallet = await this.transactionRepository.credit({
      amount,
      walletId: receiverWallet.id,
      userId: receiverId,
    });

    const transactionAuthorized =
      await this.transactionAuthorizerService.authorize();

    if (!transactionAuthorized) {
      await this.transactionRepository.rollback(
        debitSenderWallet,
        creditReceiverWallet,
        amount,
      );

      throw new BadRequestException("Transaction not authorized");
    }

    const transaction = await this.transactionRepository.register({
      amount,
      receiverId,
      senderId,
      walletId: senderWallet.id,
    });

    return transaction;
  }
}
