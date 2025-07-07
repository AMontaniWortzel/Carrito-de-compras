import { Injectable, NotFoundException } from "@nestjs/common";
import * as data from "../data.json"
import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/Categories/categories.entity";


@Injectable()
export class ProductService{
    constructor(
      @InjectRepository(Product)
      private readonly productRepository: Repository<Product>,
      @InjectRepository(Categories)
      private readonly categoriesRepository: Repository<Categories>){}

    async getProducts(page: number, limit: number): Promise<Product[]>{ 
      let products: Product[] = await this.productRepository.find();
      const start = (page - 1) * limit;
      const end = start + +limit;

      products = products.slice(start, end)

      return products
    }
    async create(): Promise<string>{
      const categories: Categories[] = await this.categoriesRepository.find();
      const products: Product[] = data.map((element) =>{
      const category: Categories | undefined = categories.find(
        (category) => element.category === category.name,
      );
      
      const newProduct = new Product();
      newProduct.name = element.name;
      newProduct.description = element.description;
      newProduct.price = element.price;
      newProduct.imgUrl = element.imgUrl
      newProduct.stock = element.stock;
      newProduct.category = category!; 

      return newProduct;
      });
      await this.productRepository
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values(products)
      .orIgnore()
      .execute();
      return "Products Added"
    }
     async findOne(id: string){
      const productId = await this.productRepository.findOne({
        where: { id}
      })
      if(!productId){
      throw new NotFoundException('Product not found');
    }
      return productId;
    }
  
}

