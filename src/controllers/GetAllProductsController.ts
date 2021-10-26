import { Request, Response } from "express";
import { GetAllProductsService } from "../services/GetAllProductsService";

export class GetAllProductsController {

  async handle(request: Request, response: Response) {

    const product_service = new GetAllProductsService();

    const products = await product_service.execute()

    return response.status(200).json(products)
  }
}