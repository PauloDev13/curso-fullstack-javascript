import { NextFunction, Request, Response } from 'express';

import Controller from './Controller';
import User from '../schemas/User';
import { UserInterface } from '../schemas/User';
import ValidationService from '../services/ValidationService';
import ServerErrorException from '../errors/ServerErrorException';
import NoContentException from '../errors/NoContentException';
import {
  responseCreate,
  responseUpdate,
  responseOk,
} from './../responses/ResponseUser';

class UserController extends Controller {
  constructor() {
    super('/users');
  }

  protected initRouter(): void {
    this.router.get(this.path, this.list);
    this.router.get(`${this.path}/:id`, this.findById);
    this.router.post(this.path, this.create);
    this.router.put(`${this.path}/:id`, this.edit);
    this.router.delete(`${this.path}/:id`, this.delete);
  }

  private async list(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    await User.find()
      .then((users: UserInterface[]) => {
        if (users.length) {
          return responseOk(res, users);
        }
        next(new NoContentException());
      })
      .catch((err) => {
        next(new ServerErrorException(err));
      });
  }

  // private async findById(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   const { id } = req.params;

  //   if (ValidationService.validateId(id)) {
  //     res.status(400).json({
  //       message: `O ID: ${id} é inválido!`,
  //     });
  //   } else {
  //     User.findById(id).exec((err, user) => {
  //       if (err || !user) {
  //         return res.status(404).json({
  //           message: `Usuário com ID: ${id} não cadastrado!`,
  //         });
  //       }
  //       return res.status(200).json(user);
  //     });
  //   }
  // }

  private async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;

    if (ValidationService.validateId(id, next)) {
      return;
    }

    await User.findById(id)
      .then((user) => {
        if (!user) {
          next(new NoContentException(id));
        }
        return responseOk(res, user);
      })
      .catch((err) => next(new ServerErrorException(err)));
  }

  private async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const user: UserInterface = req.body;

    await User.create(user)
      .then((user) => {
        return responseCreate(res, user);
      })
      .catch((err) => next(new ServerErrorException(err)));
  }

  private async edit(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;

    if (ValidationService.validateId(id, next)) {
      return;
    }

    await User.findByIdAndUpdate(id, req.body, { new: true })
      .then((user) => {
        if (user) {
          return responseUpdate(res, user);
        }
        next(new NoContentException(id));
      })
      .catch((err) => next(new ServerErrorException(err)));
  }

  private async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;

    if (ValidationService.validateId(id, next)) {
      return;
    }

    await User.findByIdAndRemove(id, {})
      .then((user) => {
        if (user) {
          return responseOk(res, user);
        }
        next(new NoContentException(id));
      })
      .catch((err) => next(new ServerErrorException(err)));
  }
}

export default UserController;
