import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';

import Controller from './Controller';
import User from '../schemas/User';
import { UserInterface } from '../schemas/User';
import ValidationService from '../services/ValidationService';

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
      .then((users) => {
        return res.status(200).json(users);
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ message: 'Erro ao buscar usuários', error: err });
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

    // ValidationService.validateId(id, res);

    if (ValidationService.validateId(id)) {
      res.status(400).json({
        message: `O ID: ${id} é invalido!`,
      });
    }

    await User.findById(id)
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            message: `Usuário com ID: ${id} não cadastrado!`,
          });
        }
        return res.status(200).json(user);
      })
      .catch((err) => {
        return res.status(500).json({
          message: `Erro ao buscar usuário com ID: ${id}`,
          error: err,
        });
      });
  }

  private async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const user: UserInterface = req.body;

    await User.create(user)
      .then((user) => {
        return res.status(201).json(user);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  }

  private async edit(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    // ValidationService.validateId(id, res);

    await User.findByIdAndUpdate(id, req.body, { new: true })
      .then((user) => {
        if (user) {
          return res.status(200).json(user);
        }
      })
      .catch((err) => {
        return res.status(500).json({
          message: `Erro ao atualizar usuário com ID: ${id}`,
          error: err,
        });
      });
  }

  private async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    // ValidationService.validateId(id, res);

    await User.findByIdAndRemove(id, {})
      .then((user) => {
        if (user) {
          return res
            .status(200)
            .json({ message: `Usuário com ID: ${id} excluído com sucesso!` });
        } else {
          return res
            .status(404)
            .json({ message: `Usuário com ID: ${id} não encontrado!` });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: `Erro ao excluir usuário com ID: ${id}`,
          error: err,
        });
      });
  }
}

export default UserController;
