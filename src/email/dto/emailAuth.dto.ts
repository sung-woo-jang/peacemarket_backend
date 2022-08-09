import { PickType } from '@nestjs/swagger';
import { Email } from '../entities/emailAuth.entity';

export class EmailAuthDto extends PickType(Email, ['email'] as const) {}
