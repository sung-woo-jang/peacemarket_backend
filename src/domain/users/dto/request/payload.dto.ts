import { PickType } from '@nestjs/swagger';
import { User } from '../../entities/user.entity';

export class PayloadDto extends PickType(User, [
  'id',
  'email',
  'nickname',
] as const) {}
