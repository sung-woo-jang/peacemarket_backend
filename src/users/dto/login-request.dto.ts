import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class LoginRequestDto extends PickType(User, [
  'email',
  'password',
] as const) {}
