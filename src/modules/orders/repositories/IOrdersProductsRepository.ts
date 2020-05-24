import OrdersProducts from '../infra/typeorm/entities/OrdersProducts';

import ICreateOrdersProductsDTO from '../dtos/ICreateOrdersProductsDTO';

export default interface IOrdersRepository {
  create(data: ICreateOrdersProductsDTO): Promise<OrdersProducts>;
  findAllByOrderId(order_id: string): Promise<OrdersProducts[]>;
}
