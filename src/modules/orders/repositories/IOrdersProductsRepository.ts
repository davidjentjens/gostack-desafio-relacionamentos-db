import OrdersProducts from '../infra/typeorm/entities/OrdersProducts';

import ICreateOrdersProductsDTO from '../dtos/ICreateOrdersProductsDTO';

export default interface IOrdersRepository {
  create(data: ICreateOrdersProductsDTO): Promise<OrdersProducts>;
  findById(id: string): Promise<OrdersProducts | undefined>;
}
