import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
    constructor(private prisma:PrismaService) {}
    async create(dto:CreateProjectDto, agencyId:string){
        const agency = await this.prisma.agency.findUnique({
            where:{id:agencyId}
        })
        if(!agency){
            throw new NotFoundException("Агенство не найдено")
        }
        return this.prisma.project.create({
            data:{
                ...dto,
                agencyId
            }
        })
    }
    async remove(id:string){
        const project= await this.prisma.project.findUnique({
            where:{id}
        })
        if(!project){
            throw new NotFoundException("Макет не найден")
        }
        return this.prisma.project.delete({
            where: {id}
        })
    }
    async show(agencyId:string){
        const allMakets = await this.prisma.project.findMany({
            where: {agencyId}
        })
        return allMakets
    }
}
