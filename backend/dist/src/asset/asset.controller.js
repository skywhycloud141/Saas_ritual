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
exports.AssetController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
require("multer");
const multer_1 = require("multer");
const path_1 = require("path");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const admin_guard_1 = require("../auth/admin.guard");
let AssetController = class AssetController {
    upload(file) {
        console.log(file);
        return {
            message: 'Файл успешно загружен',
            url: `http://localhost:3000/uploads/${file.filename}`,
        };
    }
};
exports.AssetController = AssetController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now();
                const ext = (0, path_1.extname)(file.originalname);
                const baseName = file.originalname.replace(ext, '');
                callback(null, `${baseName}-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({
                maxSize: 200 * 1024 * 1024,
                message: 'Слишком большой файл',
            }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AssetController.prototype, "upload", null);
exports.AssetController = AssetController = __decorate([
    (0, common_1.Controller)('asset')
], AssetController);
//# sourceMappingURL=asset.controller.js.map