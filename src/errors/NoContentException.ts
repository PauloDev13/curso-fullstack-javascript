import HttpException from './HttpException';

class NoContentException extends HttpException {
  constructor(id?: string) {
    if (id) {
      super(404, `Registro não localizado para o ID: ${id}`);
    }
    super(404, 'Não há registros cadastrados');
  }
}

export default NoContentException;
