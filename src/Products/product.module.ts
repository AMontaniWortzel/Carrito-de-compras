import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { ProductRepository } from "./product.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categories } from "src/Categories/categories.entity";
import { Product } from "./product.entity";




@Module({
    imports: [TypeOrmModule.forFeature([Categories, Product])],
    providers: [ProductService, ProductRepository],
    controllers: [ProductController]
})

export class ProductModule{}