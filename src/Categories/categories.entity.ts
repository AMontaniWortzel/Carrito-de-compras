import { Product } from "src/Products/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"

@Entity({
    name:"categories"
})
export class Categories{
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column({
        type: "varchar",
        length: 50,
        nullable: false,
        unique: true
    })
    name: string;

    @OneToMany(() => Product, (product) => product.category)
    product: Product[];

    
}