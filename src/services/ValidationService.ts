import { Types } from 'mongoose';
import { NextFunction, Response } from 'express';
import IdInvalidException from '../errors/IdInvalidException';

class ValidationService {
  public validateId(id: string, next: NextFunction): boolean {
    if (!Types.ObjectId.isValid(id)) {
      next(new IdInvalidException(id));
      return true;
    }
    return false;
  }

  // public validateId(id: string, res: Response) {
  //   if (!Types.ObjectId.isValid(id))
  //     return res.status(400).json({ message: `O ID: ${id} é inválido!` });
  // }
}

export default new ValidationService();
