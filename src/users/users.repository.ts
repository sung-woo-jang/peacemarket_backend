import { EntityRepository, Repository } from 'typeorm';
import { UserRole } from './entities/user.role.enum';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/request/create-user.dto';
import { ConflictException } from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async signUp(createUserDto: CreateUserDto) {
    const { email, password, nickname, phoneNumber } = createUserDto;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({
      email,
      password: hashedPassword,
      nickname,
      phoneNumber,
      role: UserRole.USER,
    }).save();
    return user;
  }

  async checkUserExists(email: string, nickname: string, phoneNumber: string) {
    if (await this.findOne({ email }))
      throw new ConflictException(
        `이미 가입한 이메일입니다. '이메일 로그인'으로 로그인해주세요.`,
      );

    if (await this.findOne({ nickname }))
      throw new ConflictException('해당 닉네임은 사용할 수 없습니다.');

    if (await this.findOne({ phoneNumber }))
      throw new ConflictException('해당 전화번호는 사용할 수 없습니다.');
  }
}
