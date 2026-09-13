import { SubscriptionService } from './subscription.service';
export declare class SubscriptionController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    generateKey(durationDays: string): import("@prisma/client").Prisma.Prisma__ActivationKeyClient<{
        id: string;
        createdAt: Date;
        code: string;
        durationDays: number;
        isUsed: boolean;
        usedBy: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    activateKey(code: string, req: {
        user: {
            agencyId: string;
        };
    }): Promise<{
        message: string;
    }>;
}
