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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'seastory624@gmail.com',
    description: 'email',
    required: true,
  })
  @Column({ type: 'varchar', unique: true })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({})
  @Column({ type: 'varchar' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @ApiProperty({})
  @Column({ type: 'varchar', unique: true })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({})
  @Column({ type: 'varchar', unique: true })
  @IsString()
  @IsNotEmpty()
  @IsMobilePhone('ko-KR')
  phoneNumber: string;

  @ApiProperty({})
  @Column({
    default:
      'http://itimg.chosun.com/sitedata/image/202102/09/2021020902484_0.jpg',
  })
  @IsString()
  @IsNotEmpty()
  imgUrl: string;

  @ApiProperty({})
  @Column({ type: 'uuid' })
  signupVerifyToken: string;

  @ApiProperty({})
  @Column({ default: false })
  @IsString()
  @IsNotEmpty()
  email_verify: boolean;

  @ApiProperty({})
  @CreateDateColumn()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({})
  @Column()
  @IsNotEmpty()
  role: UserRole;
}
