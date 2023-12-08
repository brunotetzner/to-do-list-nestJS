import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UserId } from 'src/decorators/get-user-id.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(
    @UserId() userId: number,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.create(userId, createCategoryDto);
  }

  @Post('/tasks')
  findOne(@Body('name') name: string, @UserId() userId: number) {
    return this.categoriesService.findOneWithTasks(userId, name);
  }

  @Delete(':id')
  remove(
    @UserId() userId: number,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.categoriesService.remove(userId, id);
  }
}
