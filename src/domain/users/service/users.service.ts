import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/domain/email/service/email.service';
import { CreateUserDto } from '../dto/request/create-user.dto';
import { UsersRepository } from '../repository/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.emailService.emailExists(createUserDto.email);

    if (user && user.status)
      throw new UnauthorizedException(
        `이미 가입된 계정입니다. 이메일 인증을 완료해주세요.`,
      );

    await this.usersRepository.checkUserExistsByEmail(createUserDto.email);
    await this.usersRepository.checkUserExistsByNickname(
      createUserDto.nickname,
    );

    return await this.usersRepository.signUp(createUserDto);
  }
}
