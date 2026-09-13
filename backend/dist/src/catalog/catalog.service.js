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
exports.CatalogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CatalogService = class CatalogService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto, agencyId) {
        return this.prisma.catalogItem.create({
            data: {
                ...dto,
            },
        });
    }
    findAll(page = 1, search, category) {
        return this.prisma.catalogItem.findMany({
            where: category
                ? { category, name: { contains: search } }
                : { name: { contains: search } },
            take: 10,
            skip: (page - 1) * 10,
            orderBy: { createdAt: 'desc' },
        });
    }
    findOne(id) {
        return `This action returns a #${id} catalog`;
    }
    update(id, updateCatalogDto) {
        return `This action updates a #${id} catalog`;
    }
    remove(id) {
        return `This action removes a #${id} catalog`;
    }
};
exports.CatalogService = CatalogService;
exports.CatalogService = CatalogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CatalogService);
//# sourceMappingURL=catalog.service.js.map