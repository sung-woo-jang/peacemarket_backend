import { Body, Controller, Post } from '@nestjs/common';
import { EmailAuthDto } from './dto/emailAuth.dto';
import { EmailCodeDto } from './dto/emailCode.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('/send')
  sendEmailAuthCode(@Body() emailAuthDto: EmailAuthDto) {
    return this.emailService.sendAuthCodeToEmail(emailAuthDto);
  }

  @Post('confirm')
  confirmEmailAuthCode(@Body() emailCodeDto: EmailCodeDto) {
    return this.emailService.confirmEmailAuthCode(emailCodeDto);
  }
}
