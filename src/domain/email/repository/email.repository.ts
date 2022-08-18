import { EntityRepository, Repository } from 'typeorm';
import { EmailAuthDto } from '../dto/emailAuth.dto';
import { Email } from '../entities/emailAuth.entity';

@EntityRepository(Email)
export class EmailRepository extends Repository<Email> {
  async createEmailAuth(emailAuthDto: EmailAuthDto, signupVerifyToken: string) {
    const { email } = emailAuthDto;
    const user = this.create({ email, signupVerifyToken });
    await this.save(user);
    return user;
  }
}
