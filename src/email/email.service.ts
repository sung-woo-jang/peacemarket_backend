import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Injectable } from '@nestjs/common';
import { EmailAuthDto } from './dto/emailAuth.dto';
import { EmailRepository } from './email.repository';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private emailRepository: EmailRepository,
  ) {}
  async sendMemberJoinVerification(email: string, signupVerifyToken: string) {
    const mailOptions = {
      to: email, // list of receivers
      subject: '평화마켓 회원가입 인증 메일입니다. ✔', // Subject line
      html: `
    <div style="font-size: 18px; font-weight: 700; margin-bottom: 10px; margin-top: 60px;">인증코드를 확인해주세요.</div>
    <span style="font-size: 32px; line-height: 42px; font-weight: 700; display: block; margin-top: 6px;">${signupVerifyToken}</span>
`, // HTML body content
    };

    return await this.mailerService.sendMail(mailOptions);
  }

  async sendAuthCodeToEmail(emailAuthDto: EmailAuthDto) {
    const signupVerifyToken = String(Math.random().toString(36).slice(2));
    const user = await this.emailRepository.findOne({
      email: emailAuthDto.email,
    });

    if (user.status)
      throw new ConflictException(
        `이미 가입한 이메일입니다. '이메일 로그인'으로 로그인해주세요.`,
      );

    //이메일 인증을 완료 못했지만 회원가입을 완료하지 않은 사람들 검증
    await this.sendMemberJoinVerification(
      emailAuthDto.email,
      signupVerifyToken,
    );
    if (user !== undefined) {
      user.signupVerifyToken = signupVerifyToken;
      user.expiresTime = new Date(Date.now() + 3 * 60 * 1000);
      user.save();
      return { expiresTime: user.expiresTime };
    } else {
      // db에 정보가 없을 때
      return await this.emailRepository.createEmailAuth(
        emailAuthDto,
        signupVerifyToken,
      );
    }
  }
}
