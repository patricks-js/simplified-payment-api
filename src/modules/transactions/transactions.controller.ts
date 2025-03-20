import { CurrentUserId } from "@/common/decorators/current-user-id";
import { 
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from "@nestjs/swagger";
import { Body, Controller, Post, Request } from "@nestjs/common";
import { PerformTransactionWithoutSenderIdDto } from "./dto/perform-transaction.dto";
import { TransactionsService } from "./transactions.service";

@ApiTags("Transactions")
@Controller("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post("perform")
  @ApiOperation({ summary: "Perform a money transfer between users" })
  @ApiResponse({
    status: 200,
    description: "Transaction completed successfully",
    schema: {
      example: {
        id: 1,
        amount: 100.50,
        senderId: 1,
        receiverId: 2,
        walletId: 1,
        timestamp: "2025-03-19T22:31:02.000Z"
      },
    },
  })
  @ApiBadRequestResponse({
    description: "Invalid input (e.g., insufficient balance, same sender/receiver)",
  })
  @ApiUnauthorizedResponse({
    description: "User not authenticated",
  })
  @ApiForbiddenResponse({
    description: "User not authorized (e.g., merchant trying to send money)",
  })
  async perform(
    @CurrentUserId() senderId: number,
    @Body() performTransactionDto: PerformTransactionWithoutSenderIdDto,
  ) {
    return this.transactionsService.perform({
      ...performTransactionDto,
      senderId,
    });
  }
}
