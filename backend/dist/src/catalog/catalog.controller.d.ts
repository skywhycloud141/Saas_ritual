import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
export declare class CatalogController {
    private readonly catalogService;
    constructor(catalogService: CatalogService);
    create(createCatalogDto: CreateCatalogDto, req: {
        user: {
            agencyId: string;
            email: string;
        };
    }): import("@prisma/client").Prisma.Prisma__CatalogItemClient<{
        name: string;
        id: string;
        createdAt: Date;
        category: string;
        modelUrl: string;
        previewUrl: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(category?: string, page?: string, search?: string): import("@prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: string;
        createdAt: Date;
        category: string;
        modelUrl: string;
        previewUrl: string | null;
    }[]>;
    findOne(id: string): string;
    update(id: string, updateCatalogDto: UpdateCatalogDto): string;
    remove(id: string): string;
}
