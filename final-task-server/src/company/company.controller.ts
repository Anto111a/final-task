import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  ValidationPipe,
  Put,
  Delete,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { UserDecorator } from 'src/auth/user.decorator';
import { User } from 'src/entities/user.entity';
import { CreateCompanyDto, UpdateCompanyDto } from 'src/models/company.models';
import { CompanyService } from './company.service';

@Controller('companies')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllCompany(@UserDecorator() user: User) {
    const allCompanies = await this.companyService.findAll(user.id);
    return [allCompanies];
  }

  @Get('/:slug')
  @UseGuards(AuthGuard())
  async findBySlug(@Param('slug') slug: string, @UserDecorator() user: User) {
    const company = await this.companyService.findBySlug(slug);
    return { company: company.toJSON(company) };
  }

  @Post()
  @UseGuards(AuthGuard())
  async createCompany(
    @UserDecorator() user: User,
    @Body(ValidationPipe) data: CreateCompanyDto,
  ) {
    const company = await this.companyService.createCompany(user, data);
    return { company };
  }

  @Put('/:slug')
  @UseGuards(AuthGuard())
  async updateCompany(
    @Param('slug') slug: string,
    @UserDecorator() user: User,
    @Body(ValidationPipe) data: UpdateCompanyDto,
  ) {
    const company = await this.companyService.updateCompany(slug, user, data);
    return { company };
  }

  @Delete('/:slug')
  @UseGuards(AuthGuard())
  async deleteCompany(
    @Param('slug') slug: string,
    @UserDecorator() user: User,
  ) {
    const company = await this.companyService.deleteCompany(slug, user);
    return { company };
  }
}
