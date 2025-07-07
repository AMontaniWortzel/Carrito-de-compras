import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


@Injectable()
export class loggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const fechaHora = new Date().toLocaleString();
    console.log(fechaHora,` Estas ejecutando un método ${req.method} en la ruta ${req.url}`);
    next();
  }
}