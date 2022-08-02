import {
  IsDate,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { v4 } from 'uuid';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserRole } from './user.role.enum';

@Entity()
@Unique(['email', 'nickname'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Column({ type: 'varchar' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @Column({ type: 'varchar' })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @Column({ type: 'varchar' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @Column({
    default:
      'http://itimg.chosun.com/sitedata/image/202102/09/2021020902484_0.jpg',
  })
  @IsString()
  @IsNotEmpty()
  imgUrl: string;

  @Column({ default: false })
  @IsString()
  @IsNotEmpty()
  email_verify: boolean;

  @CreateDateColumn()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @Column()
  @IsNotEmpty()
  role: UserRole;

  // @BeforeInsert()
  // addId() {
  //   this.id = v4();
  // }
}
