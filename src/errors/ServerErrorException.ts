import HttpException from './HttpException';

class ServerErrorException extends HttpException {
  constructor(error: any) {
    super(getStatus(error), getMessage(error));
  }
}

function getStatus(error: any): number {
  if (isMongoException(error)) return 400;
  return 500;
}

function isMongoException(error: any): boolean {
  if (isMongoError(error) || isValidationError(error)) return true;
  return false;
}

function isMongoError(error: { name: string }): boolean {
  return error.name === 'MongoError';
}

function isValidationError(error: { name: string }): boolean {
  return error.name === 'ValidationError';
}

function getMessage(error: { name: string }): string {
  try {
    if (isMongoException(error)) {
      if (isKeyUniqueError(error)) return getMessageKeyUnique(error);
      if (isValidationError(error)) return getMessageValidationError(error);
    } else return getMessageGeneric();
  } catch (error) {
    return getMessageGeneric();
  }
}

function isKeyUniqueError(error: any) {
  return isMongoError(error) && error.code === 11000;
}

function getMessageKeyUnique(error: any): string {
  const { keyPattern } = error;

  const listFormatedErros = [];
  Object.keys(keyPattern).forEach((field) => {
    listFormatedErros.push(`${field} deve ser único`);
  });

  return listFormatedErros.join(' | ');
}

function getMessageValidationError(error: {
  name?: string;
  errors?: any;
}): string {
  const { errors } = error;

  const listFormatedErros = [];
  Object.keys(errors).forEach((field) => {
    listFormatedErros.push(errors[field].message);
  });

  return listFormatedErros.join(' | ');
}

function getMessageGeneric(): string {
  return 'Erro interno no servidor.';
}

export default ServerErrorException;
