import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly mailerService: MailerService,
  ) {}
  async signUp(createUserDto: CreateUserDto) {
    await this.sendMemberJoinEmail(createUserDto.email);
    return await this.userRepository.signUp(createUserDto);
  }

  async sendMemberJoinEmail(email: string) {
    const mailOptions = {
      to: email, // list of receivers
      subject: '평화마켓 회원가입 인증 메일입니다. ✔', // Subject line
      html: ` 가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
        <form action=URL method="POST">
          <button>가입확인</button>
        </form>`, // HTML body content
    };

    return await this.mailerService.sendMail(mailOptions);
  }
}
