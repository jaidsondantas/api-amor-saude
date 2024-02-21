import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('seeds')
export class Seed {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  key: string;
}
