import { inject, injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';

import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import IOrdersProductsRepository from './OrdersProductsRepository';

import Order from '../entities/Order';
import OrdersProducts from '../entities/OrdersProducts';

@injectable()
class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor(
    @inject('OrdersProductsRepository')
    private ordersProductsRepository: IOrdersProductsRepository,
  ) {
    this.ormRepository = getRepository(Order);
  }

  public async create({ customer, products }: ICreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: [] as OrdersProducts[],
    });

    await this.ormRepository.save(order);

    const ordersProducts = await Promise.all(
      products.map(async product => {
        return this.ordersProductsRepository.create({
          order_id: order.id,
          product,
        });
      }),
    );

    order.order_products = ordersProducts;

    await this.ormRepository.save(order);

    return order;
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne({
      where: { id },
    });

    return order;
  }
}

export default OrdersRepository;
