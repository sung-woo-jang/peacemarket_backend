import { PickType } from '@nestjs/swagger';
import { Email } from '../entities/emailAuth.entity';

export class EmailCodeDto extends PickType(Email, [
  'email',
  'signupVerifyToken',
] as const) {}
