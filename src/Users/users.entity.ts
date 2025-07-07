import { Orders } from "src/Orders/orders.entity"
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import { Exclude } from "class-transformer"

@Entity({
    name: "users"
})
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column({
        type: "varchar",
        length: 50,
        nullable: false,
    })
    name: string

    @Column({
        type: "varchar",
        length: 50,
        nullable: false,
        unique: true,
    })
    email: string 

    @Exclude()
    @Column({
        type: "varchar",
        length: 100,
        nullable: false,
    })
    password: string


    @Column({
        type: "bigint",
    })
    phone: number


    @Column({
        type: "varchar",
        length: 50, 
    })
    country: string


    @Column({
        type: "text"
    })
    address: string


    @Column({
        type: "varchar",
        length: 50
    })
    city: string

    @Exclude()
    @Column({
        type:"boolean",
        default: false,
    })
    isAdmin: boolean

    @OneToMany(() => Orders, (order) => order.user)
    order: Orders[]

}   