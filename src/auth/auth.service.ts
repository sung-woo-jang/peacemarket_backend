import { Injectable } from '@nestjs/common';
import { PayloadDto } from 'src/users/dto/payload.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  async login(payload: PayloadDto) {
    return jwt.sign({ ...payload }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPRIESIN,
    });
  }
}
