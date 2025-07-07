import { Module } from '@nestjs/common';
import { FileUploadService } from './archivos.service';
import { FileUploadController } from './archivos.controller';
import { CloudinaryConfig } from 'src/Config/cloudinary';
import { FileUploadRepository } from './archivos.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/Products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [FileUploadService, CloudinaryConfig, FileUploadRepository],
  controllers: [FileUploadController]
})
export class FileUploadModule {}
