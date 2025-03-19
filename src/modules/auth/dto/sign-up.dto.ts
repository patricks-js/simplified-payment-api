import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  document: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(["CUSTOMER", "MERCHANT"])
  type: "CUSTOMER" | "MERCHANT";
}
