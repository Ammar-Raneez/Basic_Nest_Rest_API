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

  getProduct(id: string) {
    const product = this.findProduct(id)[0];
    return { ...product };
  }

  updateProduct(
    id: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, index] = this.findProduct(id);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }

    if (description) {
      updatedProduct.description = description;
    }

    if (price) {
      updatedProduct.price = price;
    }

    this.products[index] = updatedProduct;
  }

  private findProduct(id: string): [Product, number] {
    const index = this.products.findIndex((prod) => prod.id === id);
    const product = this.products.find((prod) => prod.id === id);
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
  
    return [product, index];
  }
}