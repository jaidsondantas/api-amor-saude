import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CompanyCreateDto {
  @ApiProperty({
    default: 'Empresa de exemplo',
  })
  @IsString()
  @IsNotEmpty()
  socialReason: string;

  @ApiProperty({
    default: 'Empresa Fantasia',
  })
  @IsString()
  @IsNotEmpty()
  fantasyName: string;

  @ApiProperty({
    default: '12345678901234',
  })
  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @ApiProperty({
    default: 1,
  })
  @IsNumber()
  regionId: number;

  @ApiProperty({
    default: '2022-01-01',
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  inaugurationDate: Date;

  @ApiProperty({
    default: true,
  })
  @IsBoolean()
  active: boolean;

  @ApiProperty({
    default: 'Ortopedista, Pediatra',
  })
  @IsNotEmpty()
  medicalSpecialties: string;
}
