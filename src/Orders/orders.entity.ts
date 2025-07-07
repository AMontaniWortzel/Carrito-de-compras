import { OrderDetails } from "src/OrderDetails/orderdetails.entity";
import { User } from "src/Users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"

@Entity({
    name: "orders"
})
export class Orders {
    @PrimaryGeneratedColumn("uuid")
    id: string 

    @Column()
    date: Date; 

    @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
    orderDetails: OrderDetails

    @ManyToOne(() => User, (users) => users.order)
    @JoinColumn({name: "user_id"}) 
    user: User;


}