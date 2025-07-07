import { BadRequestException, Body, Controller, ForbiddenException, Get, Param, ParseUUIDPipe, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './create-order.dto';
import { AuthGuard } from 'src/Auth/guard/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('orders')
export class OrderController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  createOrder( @Req() req: Request & { user: any },@Body() createOrderDto: CreateOrderDto,) {
  const tokenUserId = req.user.id;

  if (tokenUserId !== createOrderDto.userId) {
    throw new ForbiddenException('You are not authorized to carry out this order');
  }
  return this.ordersService.create(createOrderDto.userId, createOrderDto.products);
}

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(
  @Param('id', new ParseUUIDPipe ({
          version: '4',
          exceptionFactory: () =>
            new BadRequestException(
              'The format of the order ID is not valid.',
            ),
        }), ) id: string,
  @Req() req: Request & { user: any }, 
) {
  const userIdFromToken = req.user.id;
  return this.ordersService.findOne(id, userIdFromToken);
}
}
