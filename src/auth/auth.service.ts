import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import * as uuid from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly mailerService: MailerService,
  ) {}
  async signUp(createUserDto: CreateUserDto) {
    const signupVerifyToken = uuid.v1();

    await this.sendMemberJoinEmail(createUserDto.email, signupVerifyToken);
    return await this.userRepository.signUp(createUserDto, signupVerifyToken);
  }

  async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    const URL = `${process.env.BASE_URL}auth/email-verify?signupVerifyToken=${signupVerifyToken}`;

    const mailOptions = {
      to: email, // list of receivers
      subject: '평화마켓 회원가입 인증 메일입니다. ✔', // Subject line
      html: ` 가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
        <form action=${URL} method="POST">
          <button>가입확인</button>
        </form>`, // HTML body content
    };

    return await this.mailerService.sendMail(mailOptions);
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    // TODO
    // 1. DB에서 signupVerifyToken으로 회원 가입 처리중인 유저가 있는지 조회하고 없다면 에러 처리
    // 2. 바로 로그인 상태가 되도록 JWT를 발급

    throw new Error('Method not implemented.');
  }
}
