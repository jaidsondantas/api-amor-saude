import { Controller, Get } from '@nestjs/common';
import { RegionService } from './region.service';
import { Region } from './entities/region.entity';

@Controller('regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get()
  async findAll(): Promise<Region[]> {
    return this.regionService.findAll();
  }
}
