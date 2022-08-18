import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/domain/users/repository/users.repository';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/domain/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password;
      return user;
    } else throw new UnauthorizedException('로그인 실패');
  }

  async login(user: User) {
    const payload = { nickname: user.nickname, sub: user.id };
    const token = this.jwtService.sign(payload);
    return token;
  }
}
