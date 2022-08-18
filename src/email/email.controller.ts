import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorator/skip-auth.decorator';
import { EmailAuthDto } from './dto/emailAuth.dto';
import { EmailCodeDto } from './dto/emailCode.dto';
import { EmailService } from './email.service';

@ApiTags('email')
@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @ApiOperation({
    summary: '이메일 인증 전송',
    description: '이메일 인증 번호를 전송합니다.',
  })
  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({ status: 409, description: '실패' })
  @Public()
  @Post('/send')
  sendEmailAuthCode(@Body() emailAuthDto: EmailAuthDto) {
    return this.emailService.sendAuthCodeToEmail(emailAuthDto);
  }

  @ApiOperation({
    summary: '이메일 인증 확인',
    description: '인증 번호를 확인합니다.',
  })
  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({ status: 409, description: '실패' })
  @Public()
  @Post('confirm')
  confirmEmailAuthCode(@Body() emailCodeDto: EmailCodeDto) {
    return this.emailService.confirmEmailAuthCode(emailCodeDto);
  }
}
