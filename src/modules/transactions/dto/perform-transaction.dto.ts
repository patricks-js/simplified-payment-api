import { IsNumber, IsPositive } from "class-validator";

export class PerformTransactionDto {
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
  receiverId: number;

  @IsNumber()
  @IsPositive()
  amount: number;
}
