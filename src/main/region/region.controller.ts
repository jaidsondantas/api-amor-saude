import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Company } from './entities/company.entity';
import { CompaniesService } from './companies.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CompanyCreateDto } from './dto/company.dto';
import { EntityPropertyNotFoundError } from 'typeorm';
import { Total } from '../../shared/interfaces/pagination';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companyService: CompaniesService) {}

  @Get()
  async findAll(
    @Query('filter') filter: string,
    @Query('size') size: string,
    @Query('page') page: string,
  ): Promise<Company[]> {
    return this.companyService.findAll(filter, size, page);
  }

  @Get('total')
  async total(@Query('filter') filter: string): Promise<Total> {
    return this.companyService.total(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res): Promise<Company> {
    try {
      const company = await this.companyService.findOne(id);
      return res.status(HttpStatus.OK).json(company);
    } catch (e) {
      if (e.message === 'Company Not Found') {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Company not found', code: HttpStatus.NOT_FOUND });
      } else {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal Server Error' });
      }
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    companyData: CompanyCreateDto,
    @Res() res,
  ): Promise<Company> {
    try {
      const createdCompany = await this.companyService.create(companyData);
      return res.status(HttpStatus.CREATED).json(createdCompany);
    } catch (e) {
      if (e.message === 'Region Not Found') {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Region not found', code: HttpStatus.BAD_REQUEST });
      } else {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal Server Error' });
      }
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    updateData: Partial<CompanyCreateDto>,
    @Res() res,
  ): Promise<Company> {
    try {
      const createdCompany = await this.companyService.update(id, updateData);
      return res.status(HttpStatus.CREATED).json(createdCompany);
    } catch (e) {
      if (e.message === 'Region Not Found') {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Region not found', code: HttpStatus.BAD_REQUEST });
      } else if (e.message === 'Company Not Found') {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Company not found', code: HttpStatus.BAD_REQUEST });
      } else if (e instanceof EntityPropertyNotFoundError) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: e.message, code: HttpStatus.BAD_REQUEST });
      } else {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal Server Error' });
      }
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number): Promise<boolean> {
    return this.companyService.remove(id);
  }
}
