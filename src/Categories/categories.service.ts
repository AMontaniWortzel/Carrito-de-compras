import { Injectable, ConflictException  } from '@nestjs/common';
import * as data from "../data.json"
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './categories.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CategoriesService {

    constructor (@InjectRepository(Categories) 
    private readonly categoriesRepository: Repository<Categories>)   
    {}

    async create(): Promise<string> {
            const categoriesInDb = await this.categoriesRepository.find();
    
    if (categoriesInDb.length > 0) {
      throw new ConflictException('Las categorías ya fueron agregadas anteriormente.');
    }
        const categoriesNames = new Set(data.map((element) => element.category)); 
        const categoriesArray = Array.from(categoriesNames) 
        const categories = categoriesArray.map((category) => ({name: category}));
        
            await this.categoriesRepository
            .createQueryBuilder() 
            .insert()
            .into(Categories)
            .values(categories)
            .orIgnore()
            .execute(); 
         
        return "Categories added";                      
    }

    findAll(){
        return this.categoriesRepository.find()
    }
}
