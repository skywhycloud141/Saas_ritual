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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
const create_project_dto_1 = require("./dto/create-project.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const subscription_guard_1 = require("../subscription/subscription.guard");
let ProjectController = class ProjectController {
    projectService;
    constructor(projectService) {
        this.projectService = projectService;
    }
    create(createProjectDto, req) {
        return this.projectService.create(createProjectDto, req.user.agencyId);
    }
    remove(id) {
        return this.projectService.remove(id);
    }
    findAll(req) {
        return this.projectService.show(req.user.agencyId);
    }
    generateReport(id, req) {
        return this.projectService.generateReport(id, req.user.agencyId);
    }
};
exports.ProjectController = ProjectController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Создает новый 3д макет участка' }),
    (0, common_1.UseGuards)(subscription_guard_1.SubscriptionGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto, Object]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(`:id`),
    (0, swagger_1.ApiOperation)({ summary: 'Удаляет проект' }),
    __param(0, (0, common_1.Param)(`id`)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('my'),
    (0, swagger_1.ApiOperation)({ summary: 'Список всех макетов агенства' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(':id/report'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "generateReport", null);
exports.ProjectController = ProjectController = __decorate([
    (0, common_1.Controller)('project'),
    (0, swagger_1.ApiTags)('Projects (Макеты)'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
//# sourceMappingURL=project.controller.js.map