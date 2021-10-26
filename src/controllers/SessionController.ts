import { Request, Response } from "express";
import { AppError } from "../error/AppError";
import { SessionService } from "../services/SessionService";

export class SessionController {

  async handle(request: Request, response: Response) {

    const { username, password } = request.body;
    
    const session_service = new SessionService();

    const result = await session_service.execute({ username, password })

    if (result instanceof AppError)
      throw new AppError(result.message)

    return response.status(200).json(result)
  }
}