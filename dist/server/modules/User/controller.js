"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var service_1 = require("./service");
var httpStatus = require("http-status");
var UserController = /** @class */ (function () {
    function UserController() {
        this.UserService = new service_1.default();
    }
    UserController.prototype.getAll = function (req, res) {
        this.UserService
            .getAll()
            .then(function (data) {
            res.status(httpStatus.OK).json({
                payload: data
            });
        })
            .catch(function (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                payload: 'Erro ao buscar todos usuários'
            });
        });
    };
    UserController.prototype.createUser = function (req, res) {
        this.UserService
            .create(req.body)
            .then(function (data) {
            res.status(httpStatus.OK).json({
                payload: data
            });
        })
            .catch(function (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                payload: 'Erro ao cadastrar novo usuário'
            });
        });
    };
    UserController.prototype.getById = function (req, res) {
        var userId = parseInt(req.params.id);
        this.UserService.getById(userId)
            .then(function (data) {
            res.status(httpStatus.OK).json({
                payload: data
            });
        })
            .catch(function (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                payload: 'Erro ao buscar usuario'
            });
        });
    };
    UserController.prototype.updateUser = function (req, res) {
        var userId = parseInt(req.params.id);
        var props = req.body;
        this.UserService.update(userId, props)
            .then(function (data) {
            res.status(httpStatus.OK).json({
                payload: data
            });
        })
            .catch(function (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                payload: 'Erro ao atualizar o usuario'
            });
        });
    };
    UserController.prototype.deleteUser = function (req, res) {
        var userId = parseInt(req.params.id);
        this.UserService.delete(userId)
            .then(function (data) {
            res.status(httpStatus.OK).json({
                payload: data
            });
        })
            .catch(function (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                payload: 'Erro ao excluir o usuario'
            });
        });
    };
    return UserController;
}());
exports.default = UserController;
