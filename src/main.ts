import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as expressBasicAuth from 'express-basic-auth';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('/api');
  app.use(cookieParser());
  app.enableCors({ credentials: true, origin: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true })); // class-transformer가 적용되기 위한 옵션

  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: { [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('평화마켓')
    .setDescription('평화마켓 API 설명서')
    .setVersion('1.0')
    .addTag('peacemarket')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(5500);
}
bootstrap();
