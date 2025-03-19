import { Module } from "@nestjs/common";
import { PrismaModule } from "./db/prisma.module";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [AuthModule, PrismaModule],
})
export class AppModule {}
