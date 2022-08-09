import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Email extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  signupVerifyToken: string;

  @Column({ default: new Date(Date.now() + 3 * 60 * 1000) })
  expiresTime: Date;

  @Column({ default: false })
  status: boolean;
}
