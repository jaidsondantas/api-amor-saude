import { seeder } from 'nestjs-seeder';
import { SharedModule } from './shared/shared.module';
import { PrismaService } from './shared/services/prisma.service';
import { UserSeeder } from './database/seeders/user.seeder';
import { RegionSeeder } from './database/seeders/regions.seeder';

seeder({
  imports: [SharedModule],
  providers: [PrismaService],
}).run([UserSeeder, RegionSeeder]);
