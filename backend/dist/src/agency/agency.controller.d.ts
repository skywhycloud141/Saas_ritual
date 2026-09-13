import { AgencyService } from './agency.service';
import { UpdateAgencyDto } from './dto/update-agency.dto';
export declare class AgencyController {
    private readonly agencyService;
    constructor(agencyService: AgencyService);
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
    remove(id: string): string;
}
