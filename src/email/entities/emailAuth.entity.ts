import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EmailAuth {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
