"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var handlers_1 = require("../../api/responses/handlers");
var service_1 = require("./service");
var Bluebird = require("bluebird");
var HTTPStatus = require("http-status");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, Bluebird, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, service_1.default
                            .getAll()
                            .then(_.partial(handlers_1.default.onSuccess, res))
                            .catch(_.partial(handlers_1.default.onError, res, "Erro ao buscar todos os usu\u00E1rios"))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.createUser = function (req, res) {
        return __awaiter(this, void 0, Bluebird, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, service_1.default
                            .create(req.body)
                            .then(_.partial(handlers_1.default.onSuccess, res))
                            .catch(_.partial(handlers_1.default.dbErrorHandler, res, HTTPStatus.CREATED))
                            .catch(_.partial(handlers_1.default.onError, res, "Erro ao inserir novo usu\u00E1rio"))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getById = function (req, res) {
        return __awaiter(this, void 0, Bluebird, function () {
            var userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = parseInt(req.params.id);
                        return [4 /*yield*/, service_1.default.getById(userId)
                                .then(_.partial(handlers_1.default.onSuccess, res))
                                .catch(_.partial(handlers_1.default.onError, res, "Usu\u00E1rio n\u00E3o encontrado"))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updateUser = function (req, res) {
        return __awaiter(this, void 0, Bluebird, function () {
            var userId, props;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = parseInt(req.params.id);
                        props = req.body;
                        return [4 /*yield*/, service_1.default.update(userId, props)
                                .then(_.partial(handlers_1.default.onSuccess, res, HTTPStatus.CREATED))
                                .catch(_.partial(handlers_1.default.onError, res, "Falha ao atualizar usu\u00E1rio"))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.deleteUser = function (req, res) {
        return __awaiter(this, void 0, Bluebird, function () {
            var userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = parseInt(req.params.id);
                        return [4 /*yield*/, service_1.default.delete(userId)
                                .then(_.partial(handlers_1.default.onSuccess, res))
                                .catch(_.partial(handlers_1.default.onError, res, "Erro ao excluir usu\u00E1rio", , HTTPStatus.NO_CONTENT))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.default = new UserController();
