import { UserInterface } from './User';
import { Document, model, Schema } from 'mongoose';

export interface PropsInterface {
  value: String;
}

export enum StatusEnum {
  OPEN = 'OPEN',
  FINISHED = 'FINISHED',
}

export interface TaskInterface extends Document {
  description: string;
  status: StatusEnum;
  concluded: Date;
  responsible: UserInterface;
  creation: Date;
}

const TaskSchema = new Schema({
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória!'],
  },
  status: {
    type: String,
    validate: {
      validator: (value: String) => {
        if (value === StatusEnum.OPEN || value === StatusEnum.FINISHED)
          return true;
        return false;
      },
      message: (props: PropsInterface) =>
        `${props.value} não é um status válido!`,
    },
    required: [true, 'Status é obrigatório'],
    upercase: true,
  },
  concluded: {
    type: Date,
  },
  responsible: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Responsável é obrigatório'],
  },
});

export default model<TaskInterface>('Task', TaskSchema);
