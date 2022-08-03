import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendMemberJoinVerification(email: string, signupVerifyToken: string) {
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
}
