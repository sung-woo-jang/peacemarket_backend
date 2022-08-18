import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/domain/users/repository/users.repository';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local-auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: +process.env.JWT_EXPRIESIN },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
