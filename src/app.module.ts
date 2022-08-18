import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './domain/auth/auth.module';
import { UsersModule } from './domain/users/users.module';
import { ExceptionModule } from './exception/exception.module';
import { InterceptorModule } from './interceptor/interceptor.module';
import { JwtAuthGuard } from './domain/auth/guard/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { EmailModule } from './domain/email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/../config/.config.env`],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [`${__dirname}/**/entities/*.entity.{js,ts}`],
      synchronize: true, // true->앱 재실행 시 엔티티 안에서 수정된 컬럼의 길이 타입 변경값등을 해당 테이블을 Drop한 후 다시 생성함
    }),
    AuthModule,
    EmailModule,
    UsersModule,
    ExceptionModule,
    InterceptorModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
