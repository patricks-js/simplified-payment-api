import { ApiProperty } from "@nestjs/swagger";
import { UserType } from "@prisma/client";
import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";

export class SignUpDto {
  @ApiProperty({
    description: "User's full name",
    example: "John Doe",
    type: String,
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: "User's email address",
    example: "john.doe@example.com",
    type: String,
    format: "email",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User's document number (CPF/CNPJ)",
    example: "123.456.789-00",
    type: String,
  })
  @IsString()
  document: string;

  @ApiProperty({
    description: "User's password",
    example: "mySecurePassword123",
    type: String,
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: "Type of user account",
    example: "CUSTOMER",
    enum: UserType,
    enumName: "UserType",
  })
  @IsEnum(UserType)
  type: UserType;
}
