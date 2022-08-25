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
    description: 'body에 이메일담긴 email로 인증 메일을 보냄',
  })
  @ApiResponse({
    status: 201,
    description: '이메일 전송 성공',
    schema: {
      example: {
        success: true,
        data: {
          expiresTime: '2022-08-25T04:59:06.569Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: '이메일 전송 실패',
    schema: {
      example: {
        success: false,
        error: {
          statusCode: 409,
          message:
            "이미 가입한 이메일입니다. '이메일 로그인'으로 로그인해주세요.",
          error: 'Conflict',
        },
      },
    },
  })
  @Public()
  @Post('/sendAuthCode')
  sendEmailAuthCode(@Body() emailAuthDto: EmailAuthDto) {
    return this.emailService.sendAuthCodeToEmail(emailAuthDto);
  }

  @ApiOperation({
    summary: '이메일 중복 여부 확인',
    description: 'body의 이메일담긴 email로 인증 메일을 보냄',
  })
  @ApiResponse({
    status: 201,
    description: '사용 가능한 이메일입니다.',
    schema: {
      example: {
        success: true,
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: '사용중인 이메일입니다.',
    schema: {
      example: {
        success: false,
        error: {
          statusCode: 409,
          message:
            "이미 가입한 이메일입니다. '이메일 로그인'으로 로그인해주세요.",
          error: 'Conflict',
        },
      },
    },
  })
  @Public()
  @Post('/existsByEmail')
  existsByEmail(@Body() emailAuthDto: EmailAuthDto) {
    return this.emailService.existsByEmail(emailAuthDto.email);
  }

  @ApiOperation({
    summary: '이메일 인증 확인',
    description: '인증 번호를 확인합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '이메일 인증 성공',
    schema: {
      example: {
        success: true,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: '실패',
    schema: {
      example: {
        success: false,
        error: {
          statusCode: 401,
          message: '토큰값이 다릅니다.',
          error: 'Unauthorized',
        },
      },
    },
  })
  @Public()
  @Post('/confirmAuthCode')
  confirmEmailAuthCode(@Body() emailCodeDto: EmailCodeDto) {
    return this.emailService.confirmEmailAuthCode(emailCodeDto);
  }
}
