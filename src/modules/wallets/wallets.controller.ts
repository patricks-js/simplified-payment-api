import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
} from "@nestjs/swagger";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { WalletsService } from "./wallets.service";
import { DepositDto } from "./dto/deposit.dto";
import { CurrentUserId } from "@/common/decorators/current-user-id";

@ApiTags("Wallets")
@Controller("wallets")
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post("deposit")
  @ApiOperation({ summary: "Deposit money into a wallet" })
  @ApiResponse({
    status: 200,
    description: "Deposit completed successfully",
    schema: {
      example: {
        id: 1,
        balance: 1000.50,
        userId: 1,
        createdAt: "2025-03-19T22:31:02.000Z",
        updatedAt: "2025-03-19T22:31:02.000Z"
      },
    },
  })
  @ApiBadRequestResponse({
    description: "Invalid input (e.g., negative amount)",
  })
  @ApiUnauthorizedResponse({
    description: "User not authenticated",
  })
  deposit(@Body() depositDto: DepositDto) {
    return this.walletsService.deposit(depositDto);
  }

  @Get("balance")
  @ApiOperation({ summary: "Get current user's wallet balance" })
  @ApiResponse({
    status: 200,
    description: "Balance retrieved successfully",
    schema: {
      example: {
        balance: 1000.50
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: "User not authenticated",
  })
  @ApiNotFoundResponse({
    description: "Wallet not found",
  })
  async getBalance(@CurrentUserId() userId: number) {
    return {
      balance: await this.walletsService.getBalance(userId),
    };
  }
}
