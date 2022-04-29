import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get('mysql.host'),
      port: +this.configService.get<number>('mysql.port'),
      username: this.configService.get('mysql.username'),
      password: this.configService.get('mysql.password'),
      database: this.configService.get('mysql.database'),
      entities: ['dist/**/**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }
}
