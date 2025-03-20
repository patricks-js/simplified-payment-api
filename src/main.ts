import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

import { AppModule } from "./app.module";
import { setupSwagger } from "./config/swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.setGlobalPrefix("api");
  app.enableCors({ origin: "*" });
  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
