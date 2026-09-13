import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
export declare class NotificationsProcessor extends WorkerHost {
    private readonly logger;
    process(job: Job<{
        email: string;
        date: Date;
    }>): Promise<void>;
    private handleSubscriptionEmail;
}
