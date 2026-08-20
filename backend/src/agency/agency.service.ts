import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class AgencyService {
constructor(private prisma:PrismaService){
}

  findAll() {
    return `This action returns all agency`;
  }

  async findOne(id: string) {
    const agency = await this.prisma.agency.findUnique({
      where:{id},
      include:{
        projects:true
      }
    })
    if(!agency){
      throw new NotFoundException("Агенство не найдено");
    }
    return agency;
  }

async update(id: string, updateAgencyDto: UpdateAgencyDto) {
  return this.prisma.agency.update({
    where: { id },
    data: updateAgencyDto,
  });
}

  remove(id: number) {
    return `This action removes a #${id} agency`;
  }
}
