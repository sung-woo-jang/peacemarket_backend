import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { EmailService } from 'src/email/email.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { LoginRequestDto } from './dto/login-request.dto';
import * as bcrypt from 'bcryptjs';
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

    await this.usersRepository.checkUserExists(
      createUserDto.email,
      createUserDto.nickname,
      createUserDto.phoneNumber,
    );

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
    const user = await this.usersRepository.findOne({ signupVerifyToken });
    if (!user) throw new NotFoundException('유저가 존재하지 않습니다.');

    user.email_verify = true;
    this.usersRepository.save(user);

    return this.authService.login({
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    });
  }

  async login(loginRequestDto: LoginRequestDto) {
    const { email, password } = loginRequestDto;
    const user = await this.usersRepository.findOne({ email });
    if (!user.email_verify)
      throw new UnauthorizedException('이메일 인증을 받지 못했습니다.');
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.authService.login({
        id: user.id,
        email: user.email,
        nickname: user.nickname,
      });
    } else throw new UnauthorizedException('로그인 실패');
  }

  async getUserInfo(userId: string) {
    const user = await this.usersRepository.findOne({ id: userId });

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다');
    }

    return {
      id: user.id,
      nickname: user.nickname,
      email: user.email,
    };
  }
}
