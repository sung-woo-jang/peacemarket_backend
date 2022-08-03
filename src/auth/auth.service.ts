import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import * as uuid from 'uuid';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private emailService: EmailService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const signupVerifyToken = uuid.v1();

    await this.sendMemberJoinEmail(createUserDto.email, signupVerifyToken);
    return await this.userRepository.signUp(createUserDto, signupVerifyToken);
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    // TODO
    // 1. DB에서 signupVerifyToken으로 회원 가입 처리중인 유저가 있는지 조회하고 없다면 에러 처리
    // 2. 바로 로그인 상태가 되도록 JWT를 발급

    throw new Error('Method not implemented.');
  }
}
