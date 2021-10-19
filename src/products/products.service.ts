/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>
  ) {}

  async addProduct(title: string, description: string, price: number) {
    const newProduct = new this.productModel({
      title,
      description,
      price,
    });

    // mongoose query to save in db
    const result = await newProduct.save();
    console.log(result);
    return result.id as string;
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

  deleteProduct(prodId: string) {
    const index = this.findProduct(prodId)[1];
    // remove an element from this index
    this.products.splice(index, 1);
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