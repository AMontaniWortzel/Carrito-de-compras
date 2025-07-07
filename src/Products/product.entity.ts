import { Categories } from "src/Categories/categories.entity";
import { OrderDetails } from "src/OrderDetails/orderdetails.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"

@Entity({
    name: "products"
})

export class Product{

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column({
        type: "varchar",
        length: 50,
        unique: true,
        nullable: false
    })
    name: string

    @Column({
        type: "text",
        nullable: false
    })
    description: string

    @Column({
        type: "decimal",
        precision: 10, 
        scale: 2, 
        nullable: false
    })
    price: number

    @Column({
        type: "int",
        nullable: false
    })
    stock: number

     @Column({
        type: "text",
        nullable: false,
        default: "No image"
     })
    imgUrl: string

    @ManyToOne(() => Categories, (category) => category.product)
    @JoinColumn({ name: "category_id"})
    category: Categories

     @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.product)
     orderDetails: OrderDetails[]
}