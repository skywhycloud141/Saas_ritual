import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Queue } from 'bullmq';
export declare class ProjectService {
    private prisma;
    private reportsQueue;
    constructor(prisma: PrismaService, reportsQueue: Queue);
    create(dto: CreateProjectDto, agencyId: string): Promise<{
        id: string;
        name: string;
        width: number;
        length: number;
        sceneData: string;
        installationDate: Date;
        agencyId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        width: number;
        length: number;
        sceneData: string;
        installationDate: Date;
        agencyId: string;
    }>;
    show(agencyId: string): Promise<{
        id: string;
        name: string;
        width: number;
        length: number;
        sceneData: string;
        installationDate: Date;
        agencyId: string;
    }[]>;
    generateReport(id: string, agencyId: string): Promise<{
        message: string;
    }>;
}
