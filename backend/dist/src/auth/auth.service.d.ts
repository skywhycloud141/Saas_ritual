import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prismaService;
    private jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        access_token: string;
    }>;
    private generateAuthToken;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    getProfile(agencyId: string): Promise<{
        projects: {
            name: string;
            id: string;
            length: number;
            width: number;
            sceneData: string;
            installationDate: Date;
            agencyId: string;
        }[];
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        subscriptionUntil: Date | null;
        role: string;
    }>;
}
