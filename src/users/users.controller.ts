import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../decorators/validate-token-jwt-decorator';
import { UserId } from 'src/decorators/get-user-id.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/me')
  findOne(@UserId() userId: number) {
    return this.usersService.findMe(userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch()
  update(@UserId() userId: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userId, updateUserDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  remove(@UserId() userId: number) {
    return this.usersService.remove(userId);
  }
}
