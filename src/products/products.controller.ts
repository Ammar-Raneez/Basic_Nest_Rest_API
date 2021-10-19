import { Body, Controller, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

// direct all /products to this controller
@Controller('products')
export class ProductsController {
  // shortcut D. Like in Angular, specify readonly, so that no mutations can happen
  constructor(private readonly productsService: ProductsService) {}

  // the data obtained is different in nest
  @Post()
  addProduct(
    // parse the title attribute and store in prodTitle key
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const addedId = this.productsService.addProduct(prodTitle, prodDesc, prodPrice);
    return { id: addedId };
  }
}
