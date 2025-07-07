import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Users/users.entity';
import { Repository } from 'typeorm';
import { Orders } from './orders.entity';
import { OrderDetails } from 'src/OrderDetails/orderdetails.entity';
import { Product } from 'src/Products/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(OrderDetails)
    private orderDetailRepository: Repository<OrderDetails>,
  ) {}

  async create(userId: string, productIds: string[]) {
    const user: User | null = await this.usersRepository.findOneBy({
      id: userId,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const order = new Orders();
    order.date = new Date();
    order.user = user;

    const newOrder: Orders = await this.ordersRepository.save(order);

    let total = 0;

    const productsArray: Product[] = await Promise.all(
      productIds.map(async (productId) => {
        const product: Product | null = await this.productRepository.findOneBy({
          id: productId,
        });

        if (!product) {
          throw new NotFoundException('Product not found');
        }
        total += Number(product.price);

        if (product.stock <= 0) {
          throw new BadRequestException(
            `Product ${product.name} has not stock`,
          );
        }

        await this.productRepository.update(
          { id: productId },
          { stock: product.stock - 1 },
        );
        return product;
      }),
    );

    const orderDetail = new OrderDetails();
    orderDetail.order = newOrder;
    orderDetail.price = Number(total.toFixed(2));
    orderDetail.product = productsArray;

    await this.orderDetailRepository.save(orderDetail);

    return await this.ordersRepository.find({
      where: { id: newOrder.id },
      relations: { orderDetails: true },
    });
  }

  async findOne(orderId: string, userId: string) {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: { orderDetails: true },
    });
      if (!order) {
    throw new NotFoundException('Orden not found');
  }
    const orderWithUserId = await this.ordersRepository
    .createQueryBuilder('order')
    .leftJoin('order.user', 'user')
    .select(['order.id', 'user.id']) 
    .where('order.id = :orderId', { orderId })
    .getOne();

  if (!orderWithUserId || orderWithUserId['user']?.id !== userId) {
    throw new ForbiddenException('You do not have permission to view this order');
  }
  return order;
  }
}
