import { CurrentUserId } from "@/common/decorators/current-user-id";
import { Body, Controller, Post } from "@nestjs/common";
import { PerformTransactionWithoutSenderIdDto } from "./dto/perform-transaction.dto";
import { TransactionsService } from "./transactions.service";

@Controller("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post("perform")
  perform(
    @CurrentUserId() senderId: number,
    @Body() performTransactionDto: PerformTransactionWithoutSenderIdDto,
  ) {
    return this.transactionsService.perform({
      ...performTransactionDto,
      senderId,
    });
  }
}
