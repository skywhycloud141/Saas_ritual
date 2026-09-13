import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class CatalogService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateCatalogDto, agencyId: string): import("@prisma/client").Prisma.Prisma__CatalogItemClient<{
        name: string;
        id: string;
        createdAt: Date;
        category: string;
        modelUrl: string;
        previewUrl: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(page?: number, search?: string, category?: string): import("@prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: string;
        createdAt: Date;
        category: string;
        modelUrl: string;
        previewUrl: string | null;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateCatalogDto: UpdateCatalogDto): string;
    remove(id: number): string;
}
