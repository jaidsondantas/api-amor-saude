import { ApiProperty } from '@nestjs/swagger';

export class CreateRegionDto {
  @ApiProperty({
    default: 'Region 1',
  })
  name: string;
}
