import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Product } from 'src/domain/products/entities/product.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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
    example:
      'http://itimg.chosun.com/sitedata/image/202102/09/2021020902484_0.jpg',
    description: '프로필 사진',
    required: true,
  })
  @Column({
    default:
      'http://itimg.chosun.com/sitedata/image/202102/09/2021020902484_0.jpg',
  })
  @IsString()
  @IsNotEmpty()
  imgUrl: string;

  @ApiProperty({
    example: '2022-08-18T17:14:45.865Z',
    description: '계정 생성일',
    required: true,
  })
  @CreateDateColumn()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({
    enum: UserRole,
    description: '사용자 권한',
    required: true,
  })
  @Column()
  @IsNotEmpty()
  role: UserRole;

  @ApiProperty({ type: () => Product })
  @OneToMany(() => Product, (product) => product.user)
  product: Product[];
}
