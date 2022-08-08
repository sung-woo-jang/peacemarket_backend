import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PayloadDto } from 'src/users/dto/request/payload.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  async login(payload: PayloadDto) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPRIESIN,
    });
  }

  verify(jwtString: string) {
    try {
      const payload = jwt.verify(
        jwtString,
        process.env.JWT_SECRET,
      ) as jwt.JwtPayload;

      const { id, email } = payload;

      return {
        userId: id,
        email,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
