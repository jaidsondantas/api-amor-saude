import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CompanyCreateDto } from './dto/company.dto';
import { Region } from './entities/region.entity';
import { Pagination, Total } from '../../shared/interfaces/pagination';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
  ) {}

  async findAll(
    filter: string,
    size?: string,
    page?: string,
  ): Promise<Company[]> {
    let query: FindOptionsWhere<Company>;
    if (filter) {
      query = {
        fantasyName: Like(`%${filter}%`),
      };
    }
    let pagination: Pagination;

    if (size) {
      pagination = {
        size: Number(size),
      };
    }

    if (page) {
      pagination = {
        ...pagination,
        page: Number(page),
      };
    }

    const take = pagination.size || 10;
    const skip = pagination.page ? (pagination.page - 1) * take : 0;

    return this.companyRepository.find({
      relations: ['region'],
      where: query,
      take,
      skip,
    });
  }

  async total(filter: string): Promise<Total> {
    let query: FindOptionsWhere<Company>;
    if (filter) {
      query = {
        fantasyName: Like(`%${filter}%`),
      };
    }

    const total = await this.companyRepository.count({
      relations: ['region'],
      where: query,
    });

    return {
      total,
    };
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) {
      throw new Error('Company Not Found');
    }
    return company;
  }

  async create(companyData: CompanyCreateDto): Promise<Company> {
    await this.validateRegion(companyData);

    const newCompany = this.companyRepository.create(this.prepare(companyData));
    return this.companyRepository.save(newCompany);
  }

  async update(
    id: number,
    updateData: Partial<CompanyCreateDto>,
  ): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id } });

    if (!company) {
      throw new Error('Company Not Found');
    }

    if (updateData?.regionId) {
      await this.validateRegion(updateData);
    }

    await this.companyRepository.update(id, updateData);

    return { ...company, ...updateData };
  }

  private async validateRegion(updateData: Partial<CompanyCreateDto>) {
    const region = await this.regionRepository.findOne({
      where: { id: updateData.regionId },
    });

    if (!region) {
      throw new Error('Region Not Found');
    }
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.companyRepository.delete(id);
    return result.affected === 1;
  }

  private prepare(companyDto: CompanyCreateDto): Partial<Company> {
    const {
      socialReason,
      fantasyName,
      inaugurationDate,
      regionId,
      cnpj,
      active,
      medicalSpecialties,
    } = companyDto;

    return {
      socialReason,
      fantasyName,
      inaugurationDate,
      regionId,
      cnpj,
      active,
      medicalSpecialties,
    };
  }
}
