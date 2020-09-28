import { Request, Response, NextFunction } from "express";
export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {

  const message = "Service not found";

  response.status(404).setMessage(message).customResponse();
};