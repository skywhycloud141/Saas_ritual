"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModule = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
const project_controller_1 = require("./project.controller");
const subscription_guard_1 = require("../subscription/subscription.guard");
const bullmq_1 = require("@nestjs/bullmq");
const reports_processor_1 = require("./reports.processor");
const events_module_1 = require("../events/events.module");
let ProjectModule = class ProjectModule {
};
exports.ProjectModule = ProjectModule;
exports.ProjectModule = ProjectModule = __decorate([
    (0, common_1.Module)({
        controllers: [project_controller_1.ProjectController],
        providers: [project_service_1.ProjectService, subscription_guard_1.SubscriptionGuard, reports_processor_1.ReportsProcessor],
        imports: [bullmq_1.BullModule.registerQueue({ name: 'reports-queue' }), events_module_1.EventsModule],
    })
], ProjectModule);
//# sourceMappingURL=project.module.js.map