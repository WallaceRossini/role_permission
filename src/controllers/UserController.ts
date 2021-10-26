import { Request, Response } from "express";
import { AppError } from "../error/AppError";
import { UserService } from "../services/UserService";

export class UserController {

  async handle(request: Request, response: Response) {

    const { username, password } = request.body;

    const user_service = new UserService();

    const result = await user_service.execute({ username, password })

    if (result instanceof AppError)
      throw new AppError(result.message)

    return response.status(201).json(result)
  }
}