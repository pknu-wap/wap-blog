import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '@/config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@/user/user.module';
import { AuthModule } from '@/auth/auth.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ArticleModule } from './article/article.module';
import { JwtAuthMiddleware } from '@/middleware';
import { AuthGuard } from '@/common/guard';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseConfigService } from './config/database.config';
import { S3Module } from './provider/s3/s3.module';
import { SearchModule } from '@/provider/search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    JwtModule.register({}),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    UserModule,
    AuthModule,
    ArticleModule,
    S3Module,
    SearchModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtAuthMiddleware).forRoutes('*');
  }
}
