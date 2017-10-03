import { Request, Response } from 'express';
import * as _ from 'lodash';
import Handlers from '../../api/responses/handlers';
import UserService from './service';
import * as Bluebird from 'bluebird';

class UserController {

    constructor() { }

    async getAll(req: Request, res: Response): Bluebird<void> {
        await UserService
            .getAll()
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao buscar todos os usuários`))
    }

    async createUser(req: Request, res: Response): Bluebird<void> {
        await UserService
            .create(req.body)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.dbErrorHandler, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao inserir novo usuário`));
    }

    async getById(req: Request, res: Response): Bluebird<void> {
        const userId = parseInt(req.params.id);
        await UserService.getById(userId)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Usuário não encontrado`))
    }

    async updateUser(req: Request, res: Response): Bluebird<void> {
        const userId = parseInt(req.params.id);
        const props = req.body;
        await UserService.update(userId, props)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Falha ao atualizar usuário`))
    }

    async deleteUser(req: Request, res: Response): Bluebird<void> {
        const userId = parseInt(req.params.id);
        await UserService.delete(userId)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao excluir usuário`))
    }
}

export default new UserController();
