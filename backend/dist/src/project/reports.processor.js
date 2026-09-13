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
var ReportsProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const events_gateway_1 = require("../events/events.gateway");
let ReportsProcessor = ReportsProcessor_1 = class ReportsProcessor extends bullmq_1.WorkerHost {
    eventsGateway;
    logger = new common_1.Logger(ReportsProcessor_1.name);
    constructor(eventsGateway) {
        super();
        this.eventsGateway = eventsGateway;
    }
    async process(job) {
        if (job.name === 'generate-pdf') {
            this.logger.log(`Начинаем генерацию сметы для проекта: ${job.data.projectId}`);
            await new Promise((resolve) => setTimeout(resolve, 5000));
            const message = `✅ Смета сгенерирована`;
            this.logger.log(message);
            this.eventsGateway.sendReportReady(job.data.agencyId, message);
        }
    }
};
exports.ReportsProcessor = ReportsProcessor;
exports.ReportsProcessor = ReportsProcessor = ReportsProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('reports-queue'),
    __metadata("design:paramtypes", [events_gateway_1.EventsGateway])
], ReportsProcessor);
//# sourceMappingURL=reports.processor.js.map