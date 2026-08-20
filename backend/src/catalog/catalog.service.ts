import { Injectable } from '@nestjs/common';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CatalogService {
  constructor(private prisma:PrismaService){}
  create(createCatalogDto: CreateCatalogDto) {
    return 'This action adds a new catalog';
  }

  findAll(category?:string) {
    return this.prisma.catalogItem.findMany({
      where:category ? {category} : undefined,
      orderBy:{createdAt:"desc"}
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} catalog`;
  }

  update(id: number, updateCatalogDto: UpdateCatalogDto) {
    return `This action updates a #${id} catalog`;
  }

  remove(id: number) {
    return `This action removes a #${id} catalog`;
  }
}
