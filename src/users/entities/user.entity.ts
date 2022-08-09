import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from './user.role.enum';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({
    description: 'id - 자동생성',
    required: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'seastory624@gmail.com',
    description: '이메일',
    required: true,
  })
  @Column({ type: 'varchar', unique: true })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Test123$', description: '비밀번호', required: true })
  @Column({ type: 'varchar' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @ApiProperty({ example: 'peaceman', description: '닉네임', required: true })
  @Column({ type: 'varchar', unique: true })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({
    example: '010-7637-0624',
    description: '전화번호',
    required: true,
  })
  @Column({ type: 'varchar', unique: true })
  @IsString()
  @IsNotEmpty()
  @IsMobilePhone('ko-KR')
  phoneNumber: string;

  @Column({
    default:
      'http://itimg.chosun.com/sitedata/image/202102/09/2021020902484_0.jpg',
  })
  @IsString()
  @IsNotEmpty()
  imgUrl: string;

  // @Column({ type: 'uuid' })
  // signupVerifyToken: string;

  // @Column({ default: false })
  // @IsString()
  // @IsNotEmpty()
  // email_verify: boolean;

  @CreateDateColumn()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @Column()
  @IsNotEmpty()
  role: UserRole;
}
