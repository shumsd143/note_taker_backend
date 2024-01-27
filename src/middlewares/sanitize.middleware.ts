import xss from 'xss';
import { NextFunction, Request, Response } from "express";

const sanitizeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
    console.log(req.body)
  for (const key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      req.body[key] = xss(req.body[key]);
    }
  }
  console.log(req.body)

  next();
};

export default sanitizeMiddleware;
