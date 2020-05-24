import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import IOrdersRepository from '../repositories/IOrdersRepository';

import Order from '../infra/typeorm/entities/Order';

interface IRequestProduct {
  id: string;
  quantity: number;
}

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IRequestProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({
    customer_id,
    products: requestProducts,
  }: IRequest): Promise<Order> {
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Costumer not found');
    }

    const products: IProduct[] = await Promise.all(
      requestProducts.map(async requestProduct => {
        const correspondentFoundProduct = await this.productsRepository.findById(
          requestProduct.id,
        );

        if (!correspondentFoundProduct) {
          throw new AppError(`Product with id ${requestProduct.id} not found`);
        }

        if (correspondentFoundProduct.quantity < requestProduct.quantity) {
          throw new AppError(
            `Product ${correspondentFoundProduct.name} not available in the requested quantity`,
          );
        }

        return {
          product_id: correspondentFoundProduct.id,
          price: correspondentFoundProduct.price,
          quantity: requestProduct.quantity,
        };
      }),
    );

    const order = await this.ordersRepository.create({ customer, products });

    await this.productsRepository.updateQuantity(requestProducts);

    return order;
  }
}

export default CreateOrderService;
