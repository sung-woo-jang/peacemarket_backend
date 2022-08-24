import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { EmailService } from 'src/domain/email/service/email.service';
import { AuthService } from '../service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private emailService: EmailService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const emailValidation = await this.emailService.emailExists(email);

    if (emailValidation && !emailValidation.status)
      throw new UnauthorizedException(
        `이메일 인증이 완료되지 않은 계정입니다.`,
      );

    const user = await this.authService.validateUser(email, password);

    if (!user) throw new UnauthorizedException('등록되지 않은 유저입니다.');
    return user;
  }
}
