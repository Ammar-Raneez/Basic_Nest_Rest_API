import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  addProduct(title: string, description: string, price: number) {
    const prodId = Math.random().toString();
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

  getProduct(productId: string) {
    const product = this.products.find((prod) => prod.id === productId);
    if (!product) {
      // nestjs has their own way of returning errors
      throw new NotFoundException('Could not find product');
    }

    return product;
  }
}