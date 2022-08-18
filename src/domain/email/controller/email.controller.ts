import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorator/skip-auth.decorator';
import { EmailAuthDto } from '../dto/emailAuth.dto';
import { EmailCodeDto } from '../dto/emailCode.dto';
import { EmailService } from '../service/email.service';

@ApiTags('email')
@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @ApiOperation({
    summary: '인증 메일 전송',
    description: 'body의 이메일담긴 email로 인증 메일을 보냄',
  })
  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({ status: 409, description: '실패' })
  @Public()
  @Post('/verify_send')
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
  @Post('/verify_confirm')
  confirmEmailAuthCode(@Body() emailCodeDto: EmailCodeDto) {
    return this.emailService.confirmEmailAuthCode(emailCodeDto);
  }
}
