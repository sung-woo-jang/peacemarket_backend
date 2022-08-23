import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Image extends BaseEntity {
  @ApiProperty({
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
  @OneToMany(() => Product, (product) => product.image)
  product: Product;
}
