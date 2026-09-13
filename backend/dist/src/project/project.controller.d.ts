import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(createProjectDto: CreateProjectDto, req: {
        user: {
            agencyId: string;
            email: string;
        };
    }): Promise<{
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
    findAll(req: {
        user: {
            agencyId: string;
        };
    }): Promise<{
        id: string;
        name: string;
        width: number;
        length: number;
        sceneData: string;
        installationDate: Date;
        agencyId: string;
    }[]>;
    generateReport(id: string, req: {
        user: {
            agencyId: string;
        };
    }): Promise<{
        message: string;
    }>;
}
