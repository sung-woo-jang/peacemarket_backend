import { MailerService } from '@nestjs-modules/mailer';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { EmailAuthDto } from '../dto/emailAuth.dto';
import { EmailCodeDto } from '../dto/emailCode.dto';
import { EmailRepository } from '../repository/email.repository';

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
    const user = await this.emailExists(emailAuthDto.email);

    if (user && user.status)
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

  async confirmEmailAuthCode(emailCodeDto: EmailCodeDto) {
    const user = await this.emailExists(emailCodeDto.email);

    if (emailCodeDto.signupVerifyToken !== user.signupVerifyToken)
      throw new UnauthorizedException('토큰값이 다릅니다.');

    if (+new Date(user.expiresTime) - +new Date(Date.now()) < 0)
      throw new UnauthorizedException('이미 만료된 토큰입니다.');

    //인증이 완료되면 이메일 상태변경
    user.status = true;
    await user.save();
  }

  async emailExists(email: string) {
    return await this.emailRepository.findOne({
      email,
    });
  }
}
