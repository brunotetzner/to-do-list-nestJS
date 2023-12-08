"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaExceptions = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let PrismaExceptions = class PrismaExceptions {
    catch(exception, host) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const messageError = exception?.meta?.cause ?? exception.message;
        switch (exception.code) {
            case 'P2025':
                response
                    .status(404)
                    .json({
                    statusCode: 404,
                    message: messageError,
                })
                    .send();
                break;
            case 'P2002':
                response
                    .status(409)
                    .json({
                    statusCode: 409,
                    message: 'Credentials already exists',
                })
                    .send();
                break;
            default:
                response
                    .status(500)
                    .json({
                    statusCode: 500,
                    message: messageError,
                })
                    .send();
        }
    }
};
exports.PrismaExceptions = PrismaExceptions;
exports.PrismaExceptions = PrismaExceptions = __decorate([
    (0, common_1.Catch)(client_1.Prisma.PrismaClientKnownRequestError)
], PrismaExceptions);
//# sourceMappingURL=prisma-exceptions.js.map