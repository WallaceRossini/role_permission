import { Request, Response } from "express";
import { AppError } from "../error/AppError";
import { RolePermissionService } from "../services/RolePermissionService";

export class RolePermissionController {

  async handle(request: Request, response: Response) {

    const { role_id } = request.params;
    const { permissions } = request.body;

    const role_permission_service = new RolePermissionService();

    const result = await role_permission_service.execute({ role_id, permissions })

    if (result instanceof AppError)
      throw new AppError(result.message)

    return response.status(201).json(result)
  }
}