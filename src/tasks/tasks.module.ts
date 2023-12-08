import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [TasksController],
  providers: [TasksService, AuthGuard],
})
export class TasksModule {}
