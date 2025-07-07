import { IsUUID } from "class-validator"


export class ProductDto {

    @IsUUID()
    id: string
    name: string
    description: string
    price: number
    stock: number
    imgUrl: string
}