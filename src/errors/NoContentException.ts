import HttpException from './HttpException';

class NoContentException extends HttpException {
  constructor(id?: string) {
    let msg = '';

    if (id) {
      msg = `Registro não localizado para o ID: ${id}`;
    } else {
      msg = 'Não há registros cadastrados';
    }

    super(404, msg);
  }
}

export default NoContentException;
