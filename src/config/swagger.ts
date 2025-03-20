import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import * as packageJson from "../../package.json";

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle("Simplified Payment API")
    .setDescription(packageJson.description)
    .setVersion(packageJson.version)
    .addTag("Simplified Payment API")
    .addBearerAuth({ type: "apiKey", name: "Authorization", in: "header" })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);
};
