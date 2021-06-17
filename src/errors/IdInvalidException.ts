import HttpException from './HttpException';

class IdInvalidException extends HttpException {
  constructor(id: string) {
    super(400, `ID: ${id} inválido!`);
  }
}

export default IdInvalidException;
