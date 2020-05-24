import { getRepository, Repository } from 'typeorm';

import IOrdersProductsRepository from '@modules/orders/repositories/IOrdersProductsRepository';
import ICreateOrdersProductsDTO from '@modules/orders/dtos/ICreateOrdersProductsDTO';
import OrdersProducts from '../entities/OrdersProducts';

class OrdersProductsRepository implements IOrdersProductsRepository {
  private ormRepository: Repository<OrdersProducts>;

  constructor() {
    this.ormRepository = getRepository(OrdersProducts);
  }

  public async create({
    order_id,
    product,
  }: ICreateOrdersProductsDTO): Promise<OrdersProducts> {
    const ordersProducts = this.ormRepository.create({
      order_id,
      product_id: product.product_id,
      price: product.price,
      quantity: product.quantity,
    });

    await this.ormRepository.save(ordersProducts);

    return ordersProducts;
  }

  public async findAllByOrderId(order_id: string): Promise<OrdersProducts[]> {
    const ordersProducts = await this.ormRepository.find({
      where: { order_id },
    });

    return ordersProducts;
  }
}

export default OrdersProductsRepository;
