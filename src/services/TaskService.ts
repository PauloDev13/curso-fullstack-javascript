import { TaskInterface, StatusEnum } from './../schemas/Task';
import { FilterQuery } from 'mongoose';
import { Request } from 'express';
export enum TaskFilterEnum {
  MY,
  OPENED,
  FINISHED,
  ALL,
}

class TaskService {
  constructor() {}

  public getParamsList(req: Request): FilterQuery<TaskInterface[]> {
    const { filter, _id } = req.params;

    if (!filter) return null;

    // if (TaskFilterEnum[TaskFilterEnum.MY] === TaskFilterEnum[filter]) {
    //   return { responsible: { _id } };
    // }
    // if (TaskFilterEnum[TaskFilterEnum.OPENED] === TaskFilterEnum[filter]) {
    //   return { status: StatusEnum.OPEN };
    // }
    // if (TaskFilterEnum[TaskFilterEnum.FINISHED] === TaskFilterEnum[filter]) {
    //   return { tatus: StatusEnum.FINISHED };
    // }
    // if (TaskFilterEnum[TaskFilterEnum.MY] === TaskFilterEnum[filter]) {
    //   return { responsible: { _id } };
    // }

    switch (TaskFilterEnum[filter]) {
      case TaskFilterEnum[TaskFilterEnum.MY]:
        return { responsible: { _id } };
      case TaskFilterEnum[TaskFilterEnum.OPENED]:
        return { status: StatusEnum.OPEN };
      case TaskFilterEnum[TaskFilterEnum.FINISHED]:
        return { status: StatusEnum.FINISHED };
      default:
        return null;
    }
  }

  public checkStatusFinished(task: TaskInterface) {
    if (StatusEnum.FINISHED === task.status) {
      task.concluded = new Date();
    }
  }
}

export default new TaskService();
