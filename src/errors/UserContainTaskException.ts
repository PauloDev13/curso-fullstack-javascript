import HttpException from './HttpException';

class UserContainTaskException extends HttpException {
  constructor() {
    super(409, `Exclusão negada! O Usuário possui tarefas relacionadas.`);
  }
}
export default UserContainTaskException;
