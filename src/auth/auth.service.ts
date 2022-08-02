import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  create(CreateUserDto: CreateUserDto) {
    return 'This action adds a new auth';
  }
}
