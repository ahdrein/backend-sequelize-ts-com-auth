"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPStatus = require("http-status");
// import * as jwt from 'jwt-simple';
var bcrypt = require("bcrypt");
var config = require('../../config/env/config')();
var jwt = require('jsonwebtoken');
var Handlers = /** @class */ (function () {
    function Handlers() {
    }
    Handlers.prototype.onSuccess = function (res, data, statusCode) {
        if (statusCode === void 0) { statusCode = HTTPStatus.OK; }
        return res.status(statusCode)
            .json({ data: data, statusCode: statusCode });
    };
    Handlers.prototype.onError = function (res, message, err, statusCode) {
        if (statusCode === void 0) { statusCode = HTTPStatus.BAD_REQUEST; }
        console.log("Error: " + err);
        return res.status(statusCode)
            .send({
            error: message,
            status: statusCode,
            timestamp: new Date(),
            pageError: "https://erros.backend-sequelized-ts.com/" + statusCode
        });
    };
    Handlers.prototype.authSuccess = function (res, credentials, data) {
        var isMatch = bcrypt.compareSync(credentials.password, data.password);
        if (isMatch) {
            var payload = { id: data.id };
            var token = jwt.sign({
                id: data.id
            }, config.secret, {
                expiresIn: "1 day",
                audience: 'myapp.com',
                issuer: 'myApp'
            });
            var name_1 = data.name, email = data.email;
            return res.json({
                // token: jwt.encode(payload, config.secret)
                name: name_1, email: email, token: token
            });
        }
        else {
            // return res.sendStatus(HTTPStatus.UNAUTHORIZED);
            res.status(400).send({ errors: ['Usuário/Senha inválidos'] });
        }
    };
    Handlers.prototype.authFail = function (req, res) {
        return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    };
    Handlers.prototype.dbErrorHandler = function (res, err) {
        console.log("Um erro aconteceu: " + err);
        return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            code: 'ERR-01',
            message: 'Erro ao criar usuário'
        });
    };
    Handlers.prototype.errorHandlerApi = function (err, req, res, next) {
        console.error("API error handler foi executada: " + err);
        return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            errorCode: 'ERR-001',
            message: 'Erro Interno do Servidor'
        });
    };
    return Handlers;
}());
exports.default = new Handlers();
