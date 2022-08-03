import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.naver.com',
          port: 587,
          secure: false, // upgrade later with STARTTLS
          auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD,
          },
        },
        defaults: {
          from: '"seastory" <seastory624@naver.com>',
        },
        template: {
          dir: process.cwd() + '/templates/',
          adapter: new PugAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
