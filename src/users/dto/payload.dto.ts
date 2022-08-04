import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class PayloadDto extends PickType(User, [
  'id',
  'email',
  'nickname',
] as const) {}
