import User from './service';
import * as httpStatus from 'http-status';
import { createUser } from "./interface";
import { Request, Response } from 'express';

class UserController {

    private UserService: User;

    constructor(){
        this.UserService = new User();
    }

    getAll(req: Request, res: Response) {
        this.UserService
            .getAll()
            .then(data => {
                res.status(httpStatus.OK).json({
                    payload: data
                });
            })
            .catch(err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                    payload: 'Erro ao buscar todos usuários'
                })
            })

    }

    createUser(req: Request, res: Response) {
        this.UserService
        .create(req.body)
        .then(data => {
            res.status(httpStatus.OK).json({
                payload: data
            });
        })
        .catch(err => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                payload: 'Erro ao cadastrar novo usuário'
            })
        })
    }

    getById(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        this.UserService.getById(userId)
            .then(data => {
                res.status(httpStatus.OK).json({
                    payload: data
                })
            })
            .catch( err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                    payload: 'Erro ao buscar usuario'
                });
            })
    }

    updateUser(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        const props = req.body;
        this.UserService.update(userId, props)
            .then(data => {
                res.status(httpStatus.OK).json({
                    payload: data
                })
            })
            .catch( err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                    payload: 'Erro ao atualizar o usuario'
                });
            })
    }

    deleteUser(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        this.UserService.delete(userId)
            .then(data => {
                res.status(httpStatus.OK).json({
                    payload: data
                })
            })
            .catch( err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                    payload: 'Erro ao excluir o usuario'
                });
            })
    }
}

export default UserController;