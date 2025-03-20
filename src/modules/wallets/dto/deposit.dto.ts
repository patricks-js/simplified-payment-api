import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";

export class DepositDto {
  @ApiProperty({
    description: "ID of the user receiving the deposit",
    example: 1,
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  userId: number;

  @ApiProperty({
    description: "Amount to deposit into the wallet",
    example: 500.0,
    type: Number,
    minimum: 0.01,
  })
  @IsNumber()
  @IsPositive()
  amount: number;
}

export class DepositWithoutUserIdDto {
  @ApiProperty({
    description: "Amount to deposit into the wallet",
    example: 500.0,
    type: Number,
    minimum: 0.01,
  })
  @IsNumber()
  @IsPositive()
  amount: number;
}
