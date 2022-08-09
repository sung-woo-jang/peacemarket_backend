import { EntityRepository, Repository } from 'typeorm';
import { EmailAuth } from './entities/emailAuth.entity';

@EntityRepository(EmailAuth)
export class EmailRepository extends Repository<EmailAuth> {}
