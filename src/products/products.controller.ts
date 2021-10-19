import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Get(':id')
  // the @Param('id') gets the 'id' param we specify in the path
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getProduct(prodId);
  }

  @Get()
  getAllProducts() {
    // arrays are sent as json by default
    return this.productsService.getProducts();
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    return null;
  }
}
