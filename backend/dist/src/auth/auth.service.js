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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
let AuthService = class AuthService {
    prismaService;
    jwtService;
    constructor(prismaService, jwtService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const existingAgency = await this.prismaService.agency.findUnique({
            where: { email: dto.email },
        });
        if (existingAgency) {
            throw new common_1.BadRequestException('Агенство с таким email уже существует');
        }
        const hashedPassword = await bcrypt_1.default.hash(dto.password, 10);
        const agency = await this.prismaService.agency.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hashedPassword,
            },
        });
        return this.generateAuthToken(agency.id, agency.email, agency.role);
    }
    generateAuthToken(id, email, role) {
        const token = this.jwtService.sign({
            sub: id,
            email: email,
            role: role,
        });
        return {
            access_token: token,
        };
    }
    async login(dto) {
        const agency = await this.prismaService.agency.findUnique({
            where: { email: dto.email },
        });
        if (!agency) {
            throw new common_1.UnauthorizedException('Неверный email или пароль');
        }
        const isPasswordValid = await bcrypt_1.default.compare(dto.password, agency.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Неверный email или пароль');
        }
        return this.generateAuthToken(agency.id, agency.email, agency.role);
    }
    async getProfile(agencyId) {
        const profile = await this.prismaService.agency.findUnique({
            where: { id: agencyId },
            include: { projects: true },
        });
        if (!profile) {
            throw new common_1.NotFoundException('Профиль не найден');
        }
        const { password, ...profileWithoutPassword } = profile;
        return profileWithoutPassword;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map