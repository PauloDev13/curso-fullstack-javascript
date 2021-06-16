import HttpException from './HttpException';

class IdInvalidException extends HttpException {
  constructor() {
    super(400, 'ID inválido');
  }
}

export default IdInvalidException;
