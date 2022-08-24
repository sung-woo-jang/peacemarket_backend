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
    example: 'eafd837d-9d2e-439f-90d2-e0160e6bd2f3',
    description: 'id - 자동생성',
    required: true,
  })
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  // 제목
  @ApiProperty({
    example: '벽돌 팝니다',
    description: '게시글 제목',
    required: true,
  })
  @Column()
  title: string;

  // 내용
  @ApiProperty({
    example: '벽돌 싸게 팝니다. 네고 사절 쿨 거래시 착불로 보내드립니다.',
    description: '게시글 설명란',
    required: true,
  })
  @Column()
  description: string;

  // 가격
  @ApiProperty({
    example: 50000,
    description: '상품 가격',
    required: true,
  })
  @Column({ type: 'int' })
  price: number;

  // 판매여부
  @ApiProperty({
    example: true,
    description: '상품 판매 여부',
    required: true,
  })
  @Column({ default: true })
  status: boolean;

  // 등록시간
  @ApiProperty({
    example: '2022-08-18T17:14:45.865Z',
    description: '게시글',
    required: true,
  })
  @CreateDateColumn()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  // 카테고리
  @ApiProperty({
    enum: ProductCategory,
    description: '카테고리 - 한글 그대로 보내주면 됩니다.',
    required: true,
  })
  @Column({ type: 'enum', enum: ProductCategory })
  category: ProductCategory;

  // 판매자
  @ApiProperty({
    type: () => User,
    example: 'd074558e-6b09-4d57-8762-e7855f76aaa5',
  })
  @ManyToOne(() => User, (user) => user.product)
  user: User;

  // 사진 경로
  @ApiProperty({
    type: () => Image,
    example: 'images',
  })
  @OneToMany(() => Image, (images) => images.product)
  images: Image[];
}
