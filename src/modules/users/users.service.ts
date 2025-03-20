import { UserRepository } from "@/db/repositories/user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async findById(id: number) {
    return this.userRepository.findById(id);
  }
}
