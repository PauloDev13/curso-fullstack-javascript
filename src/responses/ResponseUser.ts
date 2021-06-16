import { UserInterface } from './../schemas/User';
import { Response } from 'express';

export const responseCreate = (
  res: Response,
  body: UserInterface
): Response => {
  const status = 201;
  const message = 'Criado com sucesso!';
  const error = false;

  return res.status(status).json({
    status,
    message,
    error,
    body,
  });
};

export const responseNotFound = (res: Response): Response => {
  const status = 404;
  const message = 'Rota não identificada!';
  const error = true;
  const body = {};

  return res.status(status).json({
    status,
    message,
    error,
    body,
  });
};

export const responseOk = (
  res: Response,
  body: UserInterface | UserInterface[]
): Response => {
  const status = 200;
  const message = 'Ok!';
  const error = false;

  return res.status(status).json({
    status,
    message,
    error,
    body,
  });
};

export const responseRutimeError = (
  res: Response,
  status: number,
  message: string
): Response => {
  const error = true;
  const body = {};

  return res.status(status).json({
    status,
    message,
    error,
    body,
  });
};
