import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";

export class PerformTransactionDto {
  @ApiProperty({
    description: "ID of the user sending the money",
    example: 1,
    type: Number
  })
  @IsNumber()
  @IsPositive()
  senderId: number;

  @ApiProperty({
    description: "ID of the user receiving the money",
    example: 2,
    type: Number
  })
  @IsNumber()
  @IsPositive()
  receiverId: number;

  @ApiProperty({
    description: "Amount of money to transfer",
    example: 100.50,
    type: Number,
    minimum: 0.01
  })
  @IsNumber()
  @IsPositive()
  amount: number;
}

export class PerformTransactionWithoutSenderIdDto {
  @ApiProperty({
    description: "ID of the user receiving the money",
    example: 2,
    type: Number
  })
  @IsNumber()
  @IsPositive()
  receiverId: number;

  @ApiProperty({
    description: "Amount of money to transfer",
    example: 100.50,
    type: Number,
    minimum: 0.01
  })
  @IsNumber()
  @IsPositive()
  amount: number;
}
