import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  async findOne(id: number): Promise<Company> {
    return this.companyRepository.findOne({ where: { id } });
  }

  async create(companyData: Partial<Company>): Promise<Company> {
    const newCompany = this.companyRepository.create(companyData);
    return this.companyRepository.save(newCompany);
  }

  async update(id: number, updateData: Partial<Company>): Promise<Company> {
    await this.companyRepository.update(id, updateData);
    return this.companyRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.companyRepository.delete(id);
    return result.affected === 1;
  }
}
