import { Request, Response } from "express";
import { ProductsService } from "../services/ProductsService";


export class ProductController {

  async handle(request: Request, response: Response) {

    const { name, description, price } = request.body;
    
    const product_service = new ProductsService();

    const product = await product_service.execute({ name, description, price });

    return response.status(201).json(product)
  }
}