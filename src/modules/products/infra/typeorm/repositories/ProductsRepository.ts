import { getRepository, Repository } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      price,
      quantity,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { id },
    });

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { name },
    });

    return product;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    return this.ormRepository.findByIds(productIds);
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<void> {
    await Promise.all(
      products.map(async product => {
        const foundProduct = await this.ormRepository.findOne({
          where: { id: product.id },
        });

        if (!foundProduct) {
          throw new Error(
            'Internal server error: Product not found inside updateQuantity function',
          );
        }

        foundProduct.quantity -= product.quantity;

        await this.ormRepository.save(foundProduct);
      }),
    );
  }
}

export default ProductsRepository;
