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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '' })
  @ApiResponse({})
  @ApiResponse({})
  @Post()
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }

  @ApiOperation({ summary: '' })
  @ApiResponse({})
  @ApiResponse({})
  @Post('email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto) {
    const { signupVerifyToken } = dto;
    return this.usersService.verifyEmail(signupVerifyToken);
  }

  @ApiOperation({ summary: '' })
  @ApiResponse({})
  @ApiResponse({})
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
