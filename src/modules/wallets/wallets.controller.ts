import { Body, Controller, Post } from "@nestjs/common";

import { CurrentUserId } from "@/common/decorators/current-user-id";
import { DepositWithoutUserIdDto } from "./dto/deposit.dto";
import { WalletsService } from "./wallets.service";

@Controller("wallets")
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post("deposit")
  deposit(
    @CurrentUserId() userId: number,
    @Body() depositDto: DepositWithoutUserIdDto,
  ) {
    return this.walletsService.deposit({
      userId: userId,
      amount: depositDto.amount,
    });
  }
}
