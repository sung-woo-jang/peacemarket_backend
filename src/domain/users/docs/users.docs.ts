export class UsersAPIDocs {
  static signUpOperation() {
    return {
      summary: '회원가입 API',
      description: 'peacemarket에 회원가입을 합니다.',
    };
  }

  static signUpCreatedResponse() {
    return {
      description: '계정 생성 완료',
      schema: {
        example: {
          success: true,
          data: {
            email: 'seastory624@gmail.com',
            password:
              '$2a$10$F3vIp3UG6uU.LcdFV9.n1eods00oRK/hNVTeAxUTLaAiJTRtNn9P.',
            nickname: 'gyomdyung',
            role: 'USER',
            id: '9f413133-61eb-4e48-8ec5-f75e3f901982',
            imgUrl:
              'http://itimg.chosun.com/sitedata/image/202102/09/2021020902484_0.jpg',
            createdAt: '2022-08-22T02:50:18.458Z',
          },
        },
      },
    };
  }

  static signUpBadRequestResponse() {
    return {
      description: '유효성 오류로 인한 실패',
      schema: {
        example: {
          success: false,
          error: {
            statusCode: 400,
            message: '실패 이유',
            error: 'Bad Request',
          },
        },
      },
    };
  }
  static signUpConflictResponse() {
    return {
      description:
        "이미 가입한 이메일입니다. '이메일 로그인'으로 로그인해주세요.",
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
    };
  }

  static loginOperation() {
    return {
      summary: '로그인 API',
      description: 'peacemarket에 로그인을 합니다.',
    };
  }

  static loginUnauthorizedResponse() {
    return {
      status: 401,
      description: '실패',
      schema: {
        example: {
          success: false,
          error: {
            statusCode: 401,
            message: '로그인 실패',
            error: 'Unauthorized',
          },
        },
      },
    };
  }
}
