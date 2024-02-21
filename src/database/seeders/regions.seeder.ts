import { Seeder } from 'nestjs-seeder';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { CreateRegionDto } from '../../main/companies/dto/region.dto';

@Injectable()
export class RegionSeeder implements Seeder {
  constructor(private prisma: PrismaService) {}

  async seed(): Promise<any> {
    if (!(await this.prisma.seeds.count({ where: { key: 'RegionSeeder' } }))) {
      const regionsRaw = [
        { label: 'Alto tietê' },
        { label: 'Interior' },
        { label: 'ES' },
        { label: 'SP Interior' },
        { label: 'SP' },
        { label: 'SP2' },
        { label: 'MG' },
        { label: 'Nacional' },
        { label: 'SP CAV' },
        { label: 'RJ' },
        { label: 'SP2' },
        { label: 'SP1' },
        { label: 'NE1' },
        { label: 'NE2' },
        { label: 'SUL' },
        { label: 'Norte' },
      ];

      const _regions: CreateRegionDto[] = regionsRaw.map((r) => {
        return {
          name: r.label,
        };
      });

      await this.prisma.regions.createMany({
        data: _regions,
      });

      await this.prisma.seeds.create({
        data: {
          key: 'RegionsSeeder',
        },
      });
    }

    return Promise.resolve(undefined);
  }

  drop(): Promise<any> {
    return Promise.resolve(undefined);
  }
}
