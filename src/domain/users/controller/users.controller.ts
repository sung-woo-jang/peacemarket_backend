import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/domain/auth/guard/local-auth.guard';
import { Public } from 'src/decorator/skip-auth.decorator';
import { Request, Response } from 'express';
import { AuthService } from 'src/domain/auth/service/auth.service';
import { CreateUserDto } from '../dto/request/create-user.dto';
import { UsersService } from '../service/users.service';
import { UsersAPIDocs } from '../docs/users.docs';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @ApiOperation(UsersAPIDocs.signUpOperation())
  @ApiCreatedResponse({ description: '성공' })
  @ApiUnauthorizedResponse({ description: '실패' })
  @Public()
  @Post('/signup')
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
