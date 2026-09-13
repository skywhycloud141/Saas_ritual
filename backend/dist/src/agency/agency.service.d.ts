import { UpdateAgencyDto } from './dto/update-agency.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class AgencyService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): string;
    findOne(id: string): Promise<{
        projects: {
            name: string;
            id: string;
            length: number;
            width: number;
            sceneData: string;
            installationDate: Date;
            agencyId: string;
        }[];
    } & {
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        password: string;
        subscriptionUntil: Date | null;
        role: string;
    }>;
    update(id: string, updateAgencyDto: UpdateAgencyDto): Promise<{
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        password: string;
        subscriptionUntil: Date | null;
        role: string;
    }>;
    remove(id: number): string;
}
