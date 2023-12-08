import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(userId: number, createTaskDto: CreateTaskDto): Promise<{
        categories: {
            taskId: number;
            categoryId: number;
        }[];
    } & {
        id: number;
        title: string;
        description: string;
        expirationDate: Date;
        finishDate: Date;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
    findAll(userId: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        title: string;
        description: string;
        expirationDate: Date;
        finishDate: Date;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }[]>;
    findOne(userId: number, id: number): import(".prisma/client").Prisma.Prisma__TaskClient<{
        categories: {
            taskId: number;
            categoryId: number;
        }[];
    } & {
        id: number;
        title: string;
        description: string;
        expirationDate: Date;
        finishDate: Date;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(userId: number, id: number, updateTaskDto: UpdateTaskDto): Promise<{
        categories: {
            taskId: number;
            categoryId: number;
        }[];
    } & {
        id: number;
        title: string;
        description: string;
        expirationDate: Date;
        finishDate: Date;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
    remove(userId: number, id: number): import(".prisma/client").Prisma.Prisma__TaskClient<{
        id: number;
        title: string;
        description: string;
        expirationDate: Date;
        finishDate: Date;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
