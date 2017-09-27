"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dbErrorHandler_1 = require("../../config/dbErrorHandler");
var sucessHandler_1 = require("../../api/responses/sucessHandler");
var errorHandler_1 = require("../../api/responses/errorHandler");
var service_1 = require("./service");
var _ = require("lodash");
var UserController = /** @class */ (function () {
    function UserController() {
        this.UserService = new service_1.default();
    }
    UserController.prototype.getAll = function (req, res) {
        this.UserService
            .getAll()
            .then(_.partial(sucessHandler_1.onSuccess, res))
            .catch(_.partial(errorHandler_1.onError, res, 'Erro ao buscar todos os usuários'));
    };
    UserController.prototype.createUser = function (req, res) {
        this.UserService
            .create(req.body)
            .then(_.partial(sucessHandler_1.onSuccess, res))
            .catch(_.partial(dbErrorHandler_1.dbErrorHandler, res))
            .catch(_.partial(errorHandler_1.onError, res, 'Erro ao inserir novo usuário'));
    };
    UserController.prototype.getById = function (req, res) {
        var userId = parseInt(req.params.id);
        this.UserService.getById(userId)
            .then(_.partial(sucessHandler_1.onSuccess, res))
            .catch(_.partial(errorHandler_1.onError, res, 'Usuário não encontrado'));
    };
    UserController.prototype.updateUser = function (req, res) {
        var userId = parseInt(req.params.id);
        var props = req.body;
        this.UserService.update(userId, props)
            .then(_.partial(sucessHandler_1.onSuccess, res))
            .catch(_.partial(errorHandler_1.onError, res, 'Erro ao atualizar o usuário'));
    };
    UserController.prototype.deleteUser = function (req, res) {
        var userId = parseInt(req.params.id);
        this.UserService.delete(userId)
            .then(_.partial(sucessHandler_1.onSuccess, res))
            .catch(_.partial(errorHandler_1.onError, res, 'Erro ao excluir usuário'));
    };
    return UserController;
}());
exports.default = UserController;
