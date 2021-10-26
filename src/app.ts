import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import { MySQLConnector } from './database';
import { AppError } from "./error/AppError";
import { routes } from "./routes";
require('dotenv-safe').config({
  allowEmptyValues: true
});

const app = express();

const connector: MySQLConnector = new MySQLConnector();

connector.connect().then(() => {
  console.log('[+] MySQL connected...')
}).catch(e => {
  console.log(`Error: ${e.message}`)
})

app.use(express.json());

app.use(routes);

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof AppError)
    return response.status(err.status_code).json({ message: err.message })
  return response.status(500).json({
    status: "Error 🛑 ",
    message: `Internal server error ${err.message}`
  })
})

export { app }