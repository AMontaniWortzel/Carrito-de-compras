import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './archivos.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/Products/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    const product = await this.productRepository.findOneBy({ id: productId });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const uploadResponse = await this.fileUploadRepository.uploadImage(file);

    await this.productRepository.update(product.id, {
      imgUrl: uploadResponse.url, 
    });

    return 'Image uploaded and Updated';
  }
}
