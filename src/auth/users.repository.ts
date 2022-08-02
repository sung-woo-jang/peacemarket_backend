import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user.role.enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(createUserDto: CreateUserDto) {
    const { email, password, nickname, phoneNumber } = createUserDto;

    const user = await this.create({
      email,
      password,
      nickname,
      phoneNumber,
      role: UserRole.USER,
    }).save();
    return user;
  }
}
