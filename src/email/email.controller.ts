import { Body, Controller, Post } from '@nestjs/common';
import { EmailAuthDto } from './dto/emailAuth.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('/send')
  sendEmailAuthCode(@Body() emailAuthDto: EmailAuthDto) {
    return this.emailService.sendAuthCodeToEmail(emailAuthDto);
  }
}
