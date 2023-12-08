import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '.prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}
  async create(userId: number, createTaskDto: CreateTaskDto) {
    const { categories } = createTaskDto;

    const getORCreateCategories = await Promise.all(
      categories?.map(async (categoryName) => {
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
      }),
    );

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

  findAll(userId: number) {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
    });
  }

  findOne(userId: number, id: number) {
    return this.prisma.task.findUniqueOrThrow({
      where: { id, userId },
      include: { categories: true },
    });
  }

  async update(userId: number, id: number, updateTaskDto: UpdateTaskDto) {
    const categories = updateTaskDto.categories || [];

    const getORCreateCategories = await Promise.all(
      categories?.map(async (categoryName) => {
        const category = await this.prisma.category.findMany({
          where: { name: categoryName, userId },
        })[0];
        if (category) {
          return category;
        }
        return this.prisma.category.create({
          data: { userId, name: categoryName },
        });
      }),
    );

    const currentCategories = await this.prisma.task
      .findUniqueOrThrow({ where: { id } })
      .categories();

    // Remove categories that already are saved on task
    currentCategories.map(async (category) => {
      const categoryIndex = getORCreateCategories.findIndex(
        (categoryToSave) => category.categoryId === categoryToSave.id,
      );
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

    const payload: Prisma.TaskUpdateInput = {
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

  remove(userId: number, id: number) {
    return this.prisma.task.delete({
      where: { id, userId },
    });
  }
}
