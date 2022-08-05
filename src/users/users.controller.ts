import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }

  @Post('email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto) {
    const { signupVerifyToken } = dto;
    return this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: LoginRequestDto) {
    return await this.usersService.login(dto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserInfo(@Param('id') userId: string) {
    return this.usersService.getUserInfo(userId);
  }
}
