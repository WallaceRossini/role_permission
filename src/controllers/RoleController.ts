import { Request, Response } from "express";
import { AppError } from "../error/AppError";
import { RoleService } from "../services/RoleService";

export class RoleController {

  async handle(request: Request, response: Response) {

    const { name, description } = request.body;

    const role_service = new RoleService();

    const result = await role_service.execute({ name, description })

    if (result instanceof AppError)
      throw new AppError(result.message)

      return response.status(201).json(result)
  }
}