import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  async create(userId: number, createCategoryDto: CreateCategoryDto) {
    const category = await this.prisma.category.findMany({
      where: { name: createCategoryDto.name, userId },
    });

    return (
      category[0] ||
      this.prisma.category.create({
        data: { ...createCategoryDto, userId },
      })
    );
  }

  async findOneWithTasks(userId: number, name: string) {
    const categories = await this.prisma.category.findMany({
      where: { name, userId },
      include: { tasks: true },
    });

    if (!categories.length) {
      throw new NotFoundException('Category not found');
    }

    return categories[0];
  }

  remove(userId: number, id: number) {
    return this.prisma.category.delete({ where: { id, userId } });
  }
}
