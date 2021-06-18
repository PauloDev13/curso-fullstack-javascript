import App from './app';
import UserController from './controllers/UserController';
import TaskController from './controllers/TaskController';

const app = new App([new UserController(), new TaskController()]);

app.listen(3333);
