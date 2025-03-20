import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
} from "@nestjs/swagger";
import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CurrentUserId } from "@/common/decorators/current-user-id";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  @ApiOperation({ summary: "Get current user's profile" })
  @ApiResponse({
    status: 200,
    description: "User profile retrieved successfully",
    schema: {
      example: {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        document: "123.456.789-00",
        type: "CUSTOMER",
        createdAt: "2025-03-19T22:31:02.000Z",
        updatedAt: "2025-03-19T22:31:02.000Z"
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: "User not authenticated",
  })
  @ApiNotFoundResponse({
    description: "User not found",
  })
  async getProfile(@CurrentUserId() userId: number) {
    return this.usersService.findById(userId);
  }
}
