
import { OrdersService } from "./orders.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/Users/users.entity";
import { Orders } from "./orders.entity";
import { Categories } from "src/Categories/categories.entity";
import { OrderDetails } from "src/OrderDetails/orderdetails.entity";
import { OrderController } from "./orders.controller";
import { Product } from "src/Products/product.entity";



@Module({
    imports: [TypeOrmModule.forFeature ([User, Orders, Categories, OrderDetails, Product])],
    controllers: [OrderController],
    providers: [OrdersService],
})

export class OrdersModule{}