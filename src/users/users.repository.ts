import { EntityRepository, Repository } from 'typeorm';
import { UserRole } from './entities/user.role.enum';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async signUp(createUserDto: CreateUserDto, signupVerifyToken: string) {
    const { email, password, nickname, phoneNumber } = createUserDto;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({
      email,
      password: hashedPassword,
      nickname,
      signupVerifyToken,
      phoneNumber,
      role: UserRole.USER,
    }).save();
    return user;
  }
}
