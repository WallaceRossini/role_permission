import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../error/AppError";
import { UserRepository } from "../repositories";

export function can(permissions_routes: string[]) {
  return async (request: Request, response: Response, _next: NextFunction) => {

    const { user_id } = request;

    const user_repository = getCustomRepository(UserRepository)

    const user = await user_repository.findOne({
      where: { id: user_id },
      relations: ["permissions"]
    });

    if (!user)
      return response.status(400).json("User does not exists");

    const permissions_exists = user.permissions
      .map(permission => permission.name)
      .some(permission => permissions_routes.includes(permission));

    if (!permissions_exists)
      return response.status(401).end();

    return _next();
  }
}

export function is(roles_routes: string[]) {
  return async (request: Request, response: Response, _next: NextFunction) => {

    const { user_id } = request;

    const user_repository = getCustomRepository(UserRepository)

    const user = await user_repository.findOne({
      where: { id: user_id },
      relations: ['roles']
    })

    if (!user)
      return response.status(400).json("User does not exists");

    const role_exists = user.roles
      .map(role => role.name)
      .some(role => roles_routes.includes(role));

    if (!role_exists)
      return response.status(401).end();

    return _next();
  }
}