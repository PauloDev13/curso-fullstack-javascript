import HttpException from './HttpException';

class NoContentException extends HttpException {
  constructor() {
    super(204, 'Registro não localizado');
  }
}

export default NoContentException;
