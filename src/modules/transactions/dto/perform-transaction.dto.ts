import { IsNumber, IsPositive } from "class-validator";

export class PerformTransactionDto {
  @IsNumber()
  @IsPositive()
  walletId: number;

  @IsNumber()
  @IsPositive()
  senderId: number;

  @IsNumber()
  @IsPositive()
  receiverId: number;

  @IsNumber()
  @IsPositive()
  amount: number;
}

export class PerformTransactionWithoutSenderIdDto {
  @IsNumber()
  @IsPositive()
  walletId: number;

  @IsNumber()
  @IsPositive()
  receiverId: number;

  @IsNumber()
  @IsPositive()
  amount: number;
}
