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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TasksService = class TasksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createTaskDto) {
        const { categories } = createTaskDto;
        const getORCreateCategories = await Promise.all(categories?.map(async (categoryName) => {
            const categories = await this.prisma.category.findMany({
                where: { name: categoryName, userId },
            });
            const category = categories[0];
            if (category) {
                return category;
            }
            return this.prisma.category.create({
                data: { userId, name: categoryName },
            });
        }));
        const taskBody = {
            title: createTaskDto.title,
            description: createTaskDto.description,
            expirationDate: new Date(createTaskDto.expirationDate),
            user: { connect: { id: userId } },
            categories: {
                create: getORCreateCategories.map((categoria) => {
                    return {
                        category: {
                            connect: {
                                id: categoria.id,
                            },
                        },
                    };
                }),
            },
        };
        return this.prisma.task.create({
            data: taskBody,
            include: { categories: true },
        });
    }
    findAll(userId) {
        return this.prisma.task.findMany({
            where: {
                userId,
            },
        });
    }
    findOne(userId, id) {
        return this.prisma.task.findUniqueOrThrow({
            where: { id, userId },
            include: { categories: true },
        });
    }
    async update(userId, id, updateTaskDto) {
        const categories = updateTaskDto.categories || [];
        const getORCreateCategories = await Promise.all(categories?.map(async (categoryName) => {
            const category = await this.prisma.category.findMany({
                where: { name: categoryName, userId },
            })[0];
            if (category) {
                return category;
            }
            return this.prisma.category.create({
                data: { userId, name: categoryName },
            });
        }));
        const currentCategories = await this.prisma.task
            .findUniqueOrThrow({ where: { id } })
            .categories();
        currentCategories.map(async (category) => {
            const categoryIndex = getORCreateCategories.findIndex((categoryToSave) => category.categoryId === categoryToSave.id);
            if (categoryIndex >= 0) {
                getORCreateCategories.splice(categoryIndex, 1);
            }
        });
        const mapCategoriesId = getORCreateCategories.map((categoria) => {
            return {
                category: {
                    connect: {
                        id: categoria.id,
                    },
                },
            };
        });
        const payload = {
            ...updateTaskDto,
            categories: {
                create: mapCategoriesId,
            },
        };
        return this.prisma.task.update({
            where: { id },
            data: payload,
            include: { categories: true },
        });
    }
    remove(userId, id) {
        return this.prisma.task.delete({
            where: { id, userId },
        });
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map