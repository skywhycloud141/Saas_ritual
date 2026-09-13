import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EventsGateway } from '../events/events.gateway';
export declare class ReportsProcessor extends WorkerHost {
    private eventsGateway;
    private readonly logger;
    constructor(eventsGateway: EventsGateway);
    process(job: Job<{
        projectId: string;
        sceneData: string;
        agencyId: string;
    }>): Promise<void>;
}
