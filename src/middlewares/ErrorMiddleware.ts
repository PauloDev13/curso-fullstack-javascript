import { NextFunction, Request, Response } from 'express';
import {
  responseNotFound,
  responseRuntimeError,
} from '../responses/ResponseUser';
import HttpException from '../errors/HttpException';

export const NotFoundErroMiddleware = (
  req: Request,
  res: Response
): Response => {
  return responseNotFound(res);
};

export const RuntimeErrorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || 'Erro não identificado!';

  return responseRuntimeError(res, status, message);
};
