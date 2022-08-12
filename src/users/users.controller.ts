import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { Public } from 'src/decorator/skip-auth.decorator';
import { Request, Response } from 'express';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @ApiOperation({
    summary: '회원가입 API',
    description: 'peacemarket에 회원가입을 합니다.',
  })
  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({ status: 409, description: '실패' })
  @Public()
  @Post()
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }

  @ApiOperation({ summary: '로그인 API' })
  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({ status: 401, description: '실패' })
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('/login')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(req.user);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: +process.env.JWT_EXPRIESIN,
    });
  }

  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
