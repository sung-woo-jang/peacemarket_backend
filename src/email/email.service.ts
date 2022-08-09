import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendMemberJoinVerification(email: string, signupVerifyToken: string) {
    const URL = `https://${process.env.BASE_URL}users/email-verify?signupVerifyToken=${signupVerifyToken}`;

    const mailOptions = {
      to: email, // list of receivers
      subject: '평화마켓 회원가입 인증 메일입니다. ✔', // Subject line
      html: `
<div style="font-size: 18px; font-weight: 700; margin-bottom: 10px; margin-top: 60px;">
인증코드를 확인해주세요.
    </div>
    <span style="font-size: 32px; line-height: 42px; font-weight: 700; display: block; margin-top: 6px;">
194706 
    </span>
`, // HTML body content
    };

    return await this.mailerService.sendMail(mailOptions);
  }
}
