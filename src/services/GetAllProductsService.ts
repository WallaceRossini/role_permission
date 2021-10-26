import { getCustomRepository, Repository } from "typeorm";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories";

export class GetAllProductsService {

  private product_repository: Repository<Product>

  constructor(){
    this.product_repository = getCustomRepository(ProductRepository)
  }

  async execute(): Promise<Product[]> {
    
    const products = await this.product_repository.find();

    return products;
  }
}