import { NextFunction, Request, Response } from "express"
import { decode, verify } from "jsonwebtoken";

export const Authenticated = () => {
  return async (request: Request, response: Response, _next: NextFunction) => {

    const auth_headers = request.headers.authorization;

    if (!auth_headers)
      return response.status(401).json({ error: "Token is missing" });

    const [bearer, token] = auth_headers.split(' ');

    try {

      verify(token, process.env.SECRET_JWT);

      const { sub } = decode(token);

      request.user_id = sub.toString();

      return _next()

    } catch (error) {
      return response.status(401).end();
    }

  }
}