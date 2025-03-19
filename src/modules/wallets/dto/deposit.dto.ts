import { IsNumber, IsPositive } from "class-validator";

export class DepositDto {
  @IsNumber()
  @IsPositive()
  userId: number;

  @IsNumber()
  @IsPositive()
  amount: number;
}

export class DepositWithoutUserIdDto {
  @IsNumber()
  @IsPositive()
  amount: number;
}
