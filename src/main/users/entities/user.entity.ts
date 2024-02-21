import { DateAt } from 'src/shared/models/date-at';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('db_users')
export class User extends DateAt {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  email?: string;

  @Exclude()
  @Column()
  password?: string;

  @Column()
  salt?: string;

  constructor() {
    super();
    Object.assign(this, null);
  }
}
