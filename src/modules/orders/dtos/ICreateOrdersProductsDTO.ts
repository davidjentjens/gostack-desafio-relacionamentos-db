import Product from '@modules/products/infra/typeorm/entities/Product';
import Order from '../infra/typeorm/entities/Order';

export default interface ICreateOrdersProductsDTO {
  order: Order;
  product: Product;
}
