import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), EmailModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
