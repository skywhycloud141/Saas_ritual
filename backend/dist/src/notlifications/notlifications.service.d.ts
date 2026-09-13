import { Queue } from 'bullmq';
export declare class NotlificationsService {
    private emailQueue;
    constructor(emailQueue: Queue);
    sendSubscriptionSuccess(email: string, date: Date): Promise<void>;
}
