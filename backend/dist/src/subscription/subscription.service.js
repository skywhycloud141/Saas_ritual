"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const crypto_1 = require("crypto");
const notlifications_service_1 = require("../notlifications/notlifications.service");
let SubscriptionService = class SubscriptionService {
    prisma;
    notifications;
    constructor(prisma, notifications) {
        this.prisma = prisma;
        this.notifications = notifications;
    }
    generateKey(durationDays) {
        const code = `KEY-${(0, crypto_1.randomBytes)(4).toString('hex').toUpperCase()}`;
        return this.prisma.activationKey.create({
            data: {
                code: code,
                durationDays: durationDays,
            },
        });
    }
    async activateKey(agencyId, code) {
        const key = await this.prisma.activationKey.findUnique({
            where: {
                code: code,
            },
        });
        if (!key) {
            throw new common_1.NotFoundException('Ключ не найден');
        }
        if (key.isUsed) {
            throw new common_1.BadRequestException('Ключ уже был активирован ранее');
        }
        const agency = await this.prisma.agency.findUnique({
            where: {
                id: agencyId,
            },
        });
        if (!agency) {
            throw new common_1.NotFoundException('Агенство не найдено');
        }
        const now = new Date();
        const startDate = agency.subscriptionUntil && agency.subscriptionUntil > now
            ? agency.subscriptionUntil
            : now;
        const newEndDate = new Date(startDate);
        newEndDate.setDate(newEndDate.getDate() + key.durationDays);
        await this.prisma.$transaction([
            this.prisma.activationKey.update({
                where: {
                    id: key.id,
                },
                data: {
                    isUsed: true,
                    usedBy: agencyId,
                },
            }),
            this.prisma.agency.update({
                where: {
                    id: agencyId,
                },
                data: {
                    subscriptionUntil: newEndDate,
                },
            }),
        ]);
        void this.notifications.sendSubscriptionSuccess(agency.email, newEndDate);
        return {
            message: `Подписка успешно продлена до ${newEndDate.toLocaleDateString()}`,
        };
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notlifications_service_1.NotlificationsService])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map