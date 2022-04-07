import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const configService = app.get(ConfigService);
  const port = +configService.get<number>('SERVER_PORT');
  await app.listen(port);
  logger.verbose(`Listening On Port ${port}`);
}
bootstrap();
