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
exports.AgencyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AgencyService = class AgencyService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return `This action returns all agency`;
    }
    async findOne(id) {
        const agency = await this.prisma.agency.findUnique({
            where: { id },
            include: {
                projects: true,
            },
        });
        if (!agency) {
            throw new common_1.NotFoundException('Агенство не найдено');
        }
        return agency;
    }
    async update(id, updateAgencyDto) {
        return this.prisma.agency.update({
            where: { id },
            data: updateAgencyDto,
        });
    }
    remove(id) {
        return `This action removes a #${id} agency`;
    }
};
exports.AgencyService = AgencyService;
exports.AgencyService = AgencyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AgencyService);
//# sourceMappingURL=agency.service.js.map