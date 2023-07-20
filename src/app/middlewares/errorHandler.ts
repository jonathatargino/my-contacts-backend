import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export default (error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  res.sendStatus(500);
}
