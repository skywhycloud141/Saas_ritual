"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotlificationsModule = void 0;
const common_1 = require("@nestjs/common");
const notlifications_service_1 = require("./notlifications.service");
const bullmq_1 = require("@nestjs/bullmq");
const notifications_processor_1 = require("./notifications.processor");
let NotlificationsModule = class NotlificationsModule {
};
exports.NotlificationsModule = NotlificationsModule;
exports.NotlificationsModule = NotlificationsModule = __decorate([
    (0, common_1.Module)({
        providers: [notlifications_service_1.NotlificationsService, notifications_processor_1.NotificationsProcessor],
        imports: [bullmq_1.BullModule.registerQueue({ name: 'email-queue' })],
        exports: [notlifications_service_1.NotlificationsService],
    })
], NotlificationsModule);
//# sourceMappingURL=notlifications.module.js.map