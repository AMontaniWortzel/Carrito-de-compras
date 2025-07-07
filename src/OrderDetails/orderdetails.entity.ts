import { Orders } from "src/Orders/orders.entity";
import { Product } from "src/Products/product.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"


@Entity({
    name: "orderDetails"
})
export class OrderDetails{

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2
    })
    price: number

    @ManyToMany(() => Product)
    @JoinTable({
        name: "ORDER_DETAILS_PRODUCTS", 
    })
    product: Product[]

    @OneToOne(() => Orders, (order) => order.orderDetails)
    @JoinColumn({name: "order_id"})
    order: Orders;

}