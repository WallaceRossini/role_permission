import { getCustomRepository, Repository } from "typeorm"
import { Product } from "../entities/Product"
import { ProductRepository } from "../repositories"

type ProductRequest = {
  name: string;
  description: string;
  price: number;
}

export class ProductsService {

  private product_repository: Repository<Product>

  constructor(){
    this.product_repository = getCustomRepository(ProductRepository);
  }

  async execute({ name, description, price }: ProductRequest) {

    const product = this.product_repository.create({
      name,
      description,
      price
    });

    await this.product_repository.save(product);

    return product
  }
}