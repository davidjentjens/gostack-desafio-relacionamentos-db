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
    order,
    product,
  }: ICreateOrdersProductsDTO): Promise<OrdersProducts> {
    const ordersProducts = await this.ormRepository.create({
      order,
      product,
      price: product.price,
      quantity: product.quantity,
    });

    await this.ormRepository.save(ordersProducts);

    return ordersProducts;
  }

  public async findById(id: string): Promise<OrdersProducts | undefined> {
    const ordersProducts = await this.ormRepository.findOne({
      where: { id },
    });

    return ordersProducts;
  }
}

export default OrdersProductsRepository;
