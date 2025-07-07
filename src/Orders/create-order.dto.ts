import { ArrayMaxSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID('4', {
    message: 'The format of the user ID is not valid.',
  })
  userId: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMaxSize(1)
  @IsUUID('4', { each: true, message: 'Each product ID must be a valid UUID.' })
  products: string []
}
