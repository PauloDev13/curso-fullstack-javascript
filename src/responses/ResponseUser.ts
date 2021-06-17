import { UserInterface } from './../schemas/User';
import { Response } from 'express';

export const responseCreate = (
  res: Response,
  body: UserInterface
): Response<UserInterface> => {
  const status = 201;
  const message = 'Registro criado com sucesso!';
  const error = false;

  return res.status(status).json({
    status,
    message,
    error,
    body,
  });
};

export const responseUpdate = (
  res: Response,
  body: UserInterface
): Response<UserInterface> => {
  const status = 200;
  const message = 'Registro atualizado com sucesso!';
  const error = false;

  return res.status(status).json({
    status,
    message,
    error,
    body,
  });
};

export const responseNotFound = (res: Response): Response => {
  const status = 400;
  const message = 'Recurso enexistente!';
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
): Response<UserInterface | UserInterface[]> => {
  const status = 200;
  const message = 'Operação concluída com sucesso!';
  const error = false;

  return res.status(status).json({
    status,
    message,
    error,
    body,
  });
};

export const responseRuntimeError = (
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
