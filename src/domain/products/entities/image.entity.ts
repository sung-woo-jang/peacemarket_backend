import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Image extends BaseEntity {
  @ApiProperty({
    example: '77be1264-86c8-4363-9259-d4766edeaa43',
    description: 'id - 자동생성',
    required: true,
  })
  @PrimaryGeneratedColumn('uuid')
  image_id: string;

  // 제목
  @Column()
  @IsString()
  @IsNotEmpty()
  imgUrl: string;

  // 등록시간
  @CreateDateColumn()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  // 판매자
  @ApiProperty({
    type: () => Product,
    example: 'eafd837d-9d2e-439f-90d2-e0160e6bd2f3',
  })
  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
