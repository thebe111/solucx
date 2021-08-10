import { NestFactory } from "@nestjs/core";
import { AppModule } from "./contexts/entrypoint/app.module";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    await app.listen(3000);
}
bootstrap();
