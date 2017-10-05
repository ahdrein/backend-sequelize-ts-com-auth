import { Request, Response } from 'express';
import * as _ from 'lodash';
import Handlers from '../../api/responses/handlers';
import UserService from './service';
import * as HTTPStatus from 'http-status';

class UserController {

    constructor() { }

    getAll(req: Request, res: Response){
        UserService
            .getAll()
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao buscar todos os usuários`))
    }

    createUser(req: Request, res: Response) {
        UserService
            .create(req.body)
            .then(_.partial(Handlers.onSuccess, res,  HTTPStatus.CREATED))
            .catch(_.partial(Handlers.dbErrorHandler, res,))
            .catch(_.partial(Handlers.onError, res, `Erro ao inserir novo usuário`));
    }

    getById(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        UserService.getById(userId)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Usuário não encontrado`, null ,HTTPStatus.NO_CONTENT))
    }

    updateUser(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        const props = req.body;
        UserService.update(userId, props)
            .then(_.partial(Handlers.onSuccess, res, HTTPStatus.CREATED))
            .catch(_.partial(Handlers.onError, res, `Falha ao atualizar usuário`))
    }

    deleteUser(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        UserService.delete(userId)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao excluir usuário`, null ,HTTPStatus.NO_CONTENT))
    }
}

export default new UserController();
