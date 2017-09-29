import { IUser, IUserDetail, createUser, createUsers, createUserById, createUserByEmail } from './interface';
import * as Bluebird from 'bluebird';
const model = require('../../models');

class User implements IUser {
  public id: number;
  public name: string;
  public email: string;
  public password: string;

  constructor(){}

  create(user: any){
    return model.User.create(user);
  }

  async getAll(): Bluebird<IUser[]>{
    return await model.User.findAll({
      order: ['name']
    })
    .then(createUsers);
  }

  async getById(id: number): Bluebird<IUserDetail> {
    return await model.User.findOne({
      where: {id}
    })
    .then(createUserById);
  }

  async getByEmail(email: string): Bluebird<IUserDetail> {
    return await model.User.findOne({
      where: {email}
    })
    .then(createUserByEmail);
  }

  async update(id: number, user: any): Bluebird<IUserDetail>{
    return await model.User.update(user, {
      where: {id},
      fields: ['name', 'email', 'password'],
      hooks: true,
      individualHooks: true
    });
  }

  async delete(id: number): Bluebird<IUserDetail>{
    return await model.User.destroy({
      where: {id}
    });
  }
}

export default new User();
