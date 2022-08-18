import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Email extends BaseEntity {
  @ApiProperty({
    description: 'id - 자동생성',
    required: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'seastory624@gmail.com',
    description: '인증용 이메일',
    required: true,
  })
  @Column()
  email: string;

  @ApiProperty({
    example: 'gf0dwen8yl7',
    description: '인증번호 - 자동생성',
    required: true,
  })
  @Column()
  signupVerifyToken: string;

  @ApiProperty({
    description: '만료시간 - 3분',
    required: true,
  })
  @Column({ default: new Date(Date.now() + 3 * 60 * 1000) })
  expiresTime: Date;

  @ApiProperty({
    description: '인증여부',
    required: true,
  })
  @Column({ default: false })
  status: boolean;
}
