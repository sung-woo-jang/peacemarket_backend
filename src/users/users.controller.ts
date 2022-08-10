import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { LoginRequestDto } from './dto/request/login-request.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: '회원가입 API',
    description: 'peacemarket에 회원가입을 합니다.',
  })
  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({ status: 409, description: '실패' })
  @Post()
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }

  @ApiOperation({ summary: '로그인 API' })
  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({ status: 401, description: '실패' })
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
