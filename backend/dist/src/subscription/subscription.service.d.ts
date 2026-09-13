import { PrismaService } from '../prisma/prisma.service';
import { NotlificationsService } from '../notlifications/notlifications.service';
export declare class SubscriptionService {
    private prisma;
    private notifications;
    constructor(prisma: PrismaService, notifications: NotlificationsService);
    generateKey(durationDays: number): import("@prisma/client").Prisma.Prisma__ActivationKeyClient<{
        id: string;
        createdAt: Date;
        code: string;
        durationDays: number;
        isUsed: boolean;
        usedBy: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    activateKey(agencyId: string, code: string): Promise<{
        message: string;
    }>;
}
