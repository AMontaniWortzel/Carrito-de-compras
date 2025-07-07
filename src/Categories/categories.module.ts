import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './categories.entity';
import { CategoriesService } from './categories.service';


@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  providers: [CategoriesService],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
