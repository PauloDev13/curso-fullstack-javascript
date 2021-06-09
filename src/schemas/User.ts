import { model, Schema } from 'mongoose';

export interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
  creation: Date;
}

const UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Nome é obrigatório!'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'E-mail é obrigatório!'],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória!'],
    // Quando for feito um select para recuperar os dados, o campo senha não aparecerá
    select: false,
  },
  creation: {
    type: Date,
    default: Date.now,
  },
});

export default model<UserInterface>('User', UserSchema);
