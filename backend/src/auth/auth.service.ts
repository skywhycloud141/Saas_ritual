import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(private prismaService:PrismaService,private jwtService:JwtService){}
    async register(dto:RegisterDto){
        const existingAgency = await this.prismaService.agency.findUnique({
            where: {email:dto.email}
        })
        if (existingAgency){
            throw new BadRequestException("Агенство с таким email уже существует")
        }
        const hashedPassword = await bcrypt.hash(dto.password,10)
        const agency = await this.prismaService.agency.create({
            data: {
                name:dto.name,
                email:dto.email,
                password:hashedPassword
                
            }
        })
        return this.generateAuthToken(agency.id,agency.email)
    }
    private generateAuthToken(id:string,email:string){
        const token = this.jwtService.sign({
            sub:id,
            email:email
        })
        return {
            access_token:token
        }
    }
    async login(dto:LoginDto){
        const agency = await this.prismaService.agency.findUnique({
            where: {email:dto.email}
        })
        if(!agency){
            throw new UnauthorizedException('Неверный email или пароль')
        }
        const isPasswordValid = await bcrypt.compare(dto.password,agency.password)
        if(!isPasswordValid){
            throw new UnauthorizedException('Неверный email или пароль')
        }
        return this.generateAuthToken(agency.id,agency.email)
    }
    async getProfile(agencyId){
        const profile = await this.prismaService.agency.findUnique({
            where:{id:agencyId},
            include:{projects:true}
        })
        if(!profile){
            throw new NotFoundException("Профиль не найден")
        }
        const{password,...profileWithoutPassword} = profile;
        return profileWithoutPassword
    }

}
