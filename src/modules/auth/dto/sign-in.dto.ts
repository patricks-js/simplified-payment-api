import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class SignInDto {
  @ApiProperty({
    description: "User's email address",
    example: "john.doe@example.com",
    type: String,
    format: "email"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User's password",
    example: "mySecurePassword123",
    type: String,
    minLength: 8
  })
  @IsString()
  password: string;
}
