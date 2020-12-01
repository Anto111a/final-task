import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { User } from 'src/entities/user.entity';
import { CreateCompanyDto, UpdateCompanyDto } from 'src/models/company.models';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepo: Repository<Company>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async findAll(ownerId) {
    return this.companyRepo.find({ where: { owner: ownerId } });
  }

  async findBySlug(slug: string) {
    return this.companyRepo.findOne({ where: { slug } });
  }

  private ensureOwnership(user: User, company: Company): boolean {
    return company.owner.id === user.id;
  }

  async createCompany(user: User, data: CreateCompanyDto) {
    try {
      const company = this.companyRepo.create(data);
      company.owner = user;
      const { slug } = await company.save();
      return (await this.companyRepo.findOne({ slug })).toJSON(company);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('please check the data');
      }
      throw new InternalServerErrorException();
    }
  }

  async updateCompany(slug: string, user: User, data: UpdateCompanyDto) {
    const company = await this.findBySlug(slug);
    if (!this.ensureOwnership(user, company)) {
      throw new UnauthorizedException();
    }
    await this.companyRepo.update({ slug }, data);
    return company.toJSON(company);
  }

  async deleteCompany(slug: string, user: User) {
    const company = await this.findBySlug(slug);
    if (!this.ensureOwnership(user, company)) {
      throw new UnauthorizedException();
    }
    await this.companyRepo.remove(company);
    return company;
  }
}
