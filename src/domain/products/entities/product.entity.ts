import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';
import { User } from 'src/domain/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCategory } from './category.enum';
import { Image } from './image.entity';

@Entity()
export class Product extends BaseEntity {
  @ApiProperty({
    description: 'id - 자동생성',
    required: true,
  })
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  // 제목
  @Column()
  title: string;

  // 내용
  @Column()
  description: string;

  // 가격
  @Column({ type: 'int' })
  price: number;

  // 판매여부
  @Column({ default: true })
  status: boolean;

  // 등록시간
  @CreateDateColumn()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  // 카테고리
  @Column()
  category: ProductCategory;

  // 판매자
  @ManyToOne(() => User, (user) => user.product)
  user: User;

  // 사진 경로
  @OneToMany(() => Image, (images) => images.product)
  images: Image[];
}
