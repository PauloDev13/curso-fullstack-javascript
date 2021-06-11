import { Router } from 'express';

abstract class Controller {
  protected path: string;
  public router: Router;

  constructor(path: string) {
    this.path = path;
    this.router = Router();

    setTimeout(() => {
      this.initRouter();
    }, 0);
  }

  protected abstract initRouter(): void;
}

export default Controller;
