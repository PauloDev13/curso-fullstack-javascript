import { NextFunction } from 'express';
import { FilterQuery } from 'mongoose';

import { TaskInterface } from './../schemas/Task';
import Task from '../schemas/Task';
import UserContainTaskException from '../errors/UserContainTaskException';

class UserService {
  constructor() {}

  public async validadeExistAnyTasks(
    id: string,
    next: NextFunction
  ): Promise<boolean> {
    const tasks = await Task.exists({
      responsible: { _id: id },
    } as FilterQuery<TaskInterface>);

    if (tasks) {
      next(new UserContainTaskException());
      return true;
    }
    return false;
  }
}

export default new UserService();
