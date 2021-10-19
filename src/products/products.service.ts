import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  addProduct(title: string, description: string, price: number) {
    const prodId = new Date().toString();
    const newProduct = new Product(
      prodId,
      title,
      description,
      price,
    );

    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    // return a copy to not return reference to actual private products array
    // return [...this.products]; or below
    return this.products.slice();
  }
}