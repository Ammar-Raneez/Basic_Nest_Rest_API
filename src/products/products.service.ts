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
    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products as Product[];
  }

  async getProduct(id: string) {
    const product = await this.findProduct(id);
    return { ...product };
  }

  updateProduct(
    id: string,
    title: string,
    description: string,
    price: number,
  ) {
    // const [product, index] = this.findProduct(id);
    // const updatedProduct = { ...product };
    // if (title) {
    //   updatedProduct.title = title;
    // }

    // if (description) {
    //   updatedProduct.description = description;
    // }

    // if (price) {
    //   updatedProduct.price = price;
    // }

    // this.products[index] = updatedProduct;
  }

  deleteProduct(prodId: string) {
    const index = this.findProduct(prodId)[1];
    // remove an element from this index
    this.products.splice(index, 1);
  }

  private async findProduct(id: string): Promise<Product> {
    try {
      const product = await this.productModel.findById(id);
      if (!product) {
        throw new NotFoundException('Could not find product');
      }
    
      return product;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }
}