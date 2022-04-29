import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { Logger } from '@nestjs/common';
import { setupSwagger } from '@/utils';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const logger = new Logger();
  const configService = app.get(ConfigService);
  const port = +configService.get<number>('server.port');
  setupSwagger(app);
  await app.listen(port);
  logger.verbose(`Listening On Port ${port}`);
}
bootstrap();
