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

    if (user && !user.status)
      throw new UnauthorizedException(`이메일 인증을 받지 못 한 계정입니다.`);

    await this.usersRepository.checkUserExistsByEmail(createUserDto.email);
    await this.usersRepository.checkUserExistsByNickname(
      createUserDto.nickname,
    );

    return await this.usersRepository.signUp(createUserDto);
  }
}
