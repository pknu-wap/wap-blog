import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '@/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [process.env.NODE_ENV ? 'dev' : '.env'],
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      load: [configuration],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
