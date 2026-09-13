"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const agency_module_1 = require("./agency/agency.module");
const prisma_service_1 = require("./prisma/prisma.service");
const prisma_module_1 = require("./prisma/prisma.module");
const config_1 = require("@nestjs/config");
const asset_controller_1 = require("./asset/asset.controller");
const project_module_1 = require("./project/project.module");
const auth_module_1 = require("./auth/auth.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const catalog_module_1 = require("./catalog/catalog.module");
const subscription_module_1 = require("./subscription/subscription.module");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const bullmq_1 = require("@nestjs/bullmq");
const notlifications_module_1 = require("./notlifications/notlifications.module");
const events_module_1 = require("./events/events.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            agency_module_1.AgencyModule,
            prisma_module_1.PrismaModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            project_module_1.ProjectModule,
            auth_module_1.AuthModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads/',
            }),
            catalog_module_1.CatalogModule,
            subscription_module_1.SubscriptionModule,
            throttler_1.ThrottlerModule.forRoot([{ ttl: 60000, limit: 20 }]),
            bullmq_1.BullModule.forRoot({ connection: { host: 'localhost', port: 6379 } }),
            notlifications_module_1.NotlificationsModule,
            events_module_1.EventsModule,
        ],
        controllers: [app_controller_1.AppController, asset_controller_1.AssetController],
        providers: [
            app_service_1.AppService,
            prisma_service_1.PrismaService,
            { provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map