import { NextFunction, Request, Response } from 'express';
import NoContentException from '../errors/NoContentException';
import ServerErrorException from '../errors/ServerErrorException';
import {
  responseCreate,
  responseOk,
  responseUpdate,
} from '../responses/ResponseUser';
import Task from '../schemas/Task';
import TaskService, { TaskFilterEnum } from '../services/TaskService';
import ValidationService from '../services/ValidationService';
import { TaskInterface } from './../schemas/Task';
import Controller from './Controller';

class TaskController extends Controller {
  constructor() {
    super('/tasks');
  }

  protected initRouter(): void {
    this.router.get(`${this.path}/:filter/:_id`, this.list);
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
    await Task.find(TaskService.getParamsList(req))
      .populate('responsible')
      .then((tasks: TaskInterface[]) => {
        if (tasks.length) {
          return responseOk(res, tasks);
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

    await Task.findById(id)
      .populate('responsible')
      .then((task) => {
        if (!task) {
          next(new NoContentException(id));
        }
        return responseOk(res, task);
      })
      .catch((err) => next(new ServerErrorException(err)));
  }

  private async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const task: TaskInterface = req.body;

    TaskService.checkStatusFinished(task);

    await Task.create(task)
      .then(async (task) => {
        const taskReturn = await Task.findById(task.id).populate('responsible');
        return responseCreate(res, taskReturn);
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

    await Task.findByIdAndUpdate(id, req.body, { new: true })
      .then(async (task) => {
        if (task) {
          const taskReturn = await Task.findById(task.id).populate(
            'responsible'
          );

          TaskService.checkStatusFinished(taskReturn);
          return responseUpdate(res, taskReturn);
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

    await Task.findByIdAndRemove(id, {})
      .then((task) => {
        if (task) {
          return responseOk(res, task);
        }
        next(new NoContentException(id));
      })
      .catch((err) => next(new ServerErrorException(err)));
  }
}

export default TaskController;
