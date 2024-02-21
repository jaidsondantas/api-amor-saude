import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Region } from '../../region/entities/region.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  socialReason: string;

  @Column({ type: 'varchar', nullable: false })
  fantasyName: string;

  @Column({ type: 'varchar', nullable: false })
  cnpj: string;

  @Column({ type: 'int', nullable: false })
  regionId: number;

  @ManyToOne(() => Region, (region: Region) => region.id)
  @JoinColumn({ name: 'regionId' })
  region: Region;

  @Column({ type: 'date', nullable: false })
  inaugurationDate: Date;

  @Column({ type: 'boolean', nullable: false })
  active: boolean;

  @Column({ type: 'varchar', nullable: false })
  medicalSpecialties: string;
}
