import { Request, Response } from 'express';
import UserController from './controller';
import * as Bluebird from 'bluebird';

class UserRoutes {

  constructor() { }

  async index(req: Request, res: Response): Bluebird<void> {
    return await UserController.getAll(req, res);
  }

  async create(req: Request, res: Response): Bluebird<void> {
    return await UserController.createUser(req, res);
  }

  async findOne(req: Request, res: Response): Bluebird<void> {
    return await UserController.getById(req, res);
  }

  async update(req: Request, res: Response): Bluebird<void> {
    return await UserController.updateUser(req, res);
  }

  async destroy(req: Request, res: Response): Bluebird<void> {
    return await UserController.deleteUser(req, res);
  }

}

export default new UserRoutes();
