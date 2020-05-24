interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

export default interface ICreateOrdersProductsDTO {
  order_id: string;
  product: IProduct;
}
