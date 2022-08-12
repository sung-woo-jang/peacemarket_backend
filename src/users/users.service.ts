import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.emailService.emailExists(createUserDto.email);

    if (!user || !user.status)
      throw new UnauthorizedException(`이메일 인증이 되지 않은 계정입니다.`);

    await this.usersRepository.checkUserExistsByEmail(createUserDto.email);
    await this.usersRepository.checkUserExistsByNickname(
      createUserDto.nickname,
    );

    return await this.usersRepository.signUp(createUserDto);
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
