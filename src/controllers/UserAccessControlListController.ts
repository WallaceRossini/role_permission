import { Request, Response } from "express";
import { AppError } from "../error/AppError";
import { UserAccessControlListService } from "../services/UserAccessControlListService";

export class UserACLController {

  async handle(request: Request, response: Response) {

    const { user_id } = request;
    const { permissions, roles } = request.body;

    const user_acl_service = new UserAccessControlListService();

    const result = await user_acl_service.execute({
      user_id,
      permissions,
      roles
    })

    if (result instanceof AppError)
      throw new AppError(result.message)

    return response.status(201).json(result)
  }
}