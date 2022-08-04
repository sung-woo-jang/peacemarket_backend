import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { EmailService } from 'src/email/email.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private authService: AuthService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const signupVerifyToken = uuid.v1();

    await this.sendMemberJoinEmail(createUserDto.email, signupVerifyToken);
    return await this.usersRepository.signUp(createUserDto, signupVerifyToken);
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
    const user = await this.usersRepository.findOne({ signupVerifyToken });
    if (!user) throw new NotFoundException('유저가 존재하지 않습니다.');

    return this.authService.login({
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    });
    // 2. 바로 로그인 상태가 되도록 JWT를 발급
  }
}
