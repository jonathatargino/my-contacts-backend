import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

module.exports = (error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  res.sendStatus(500);
}
