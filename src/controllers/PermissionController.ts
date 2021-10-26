import { Request, Response } from "express";
import { PermissionService } from "../services/PermissionService";

export class PermissionController {

  async handle(request: Request, response: Response) {

    const { name, description } = request.body;

    const permission_service = new PermissionService()

    const result = await permission_service.execute({ name, description });

    if (result instanceof Error)
      return response.status(400).json(result.message);


    return response.status(201).json(result)

  }
}