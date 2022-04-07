import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { Logger } from '@nestjs/common';
import { setupSwagger } from '@/utils/setupSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const configService = app.get(ConfigService);
  const port = +configService.get<number>('SERVER_PORT');
  setupSwagger(app);
  await app.listen(port);
  logger.verbose(`Listening On Port ${port}`);
}
bootstrap();
