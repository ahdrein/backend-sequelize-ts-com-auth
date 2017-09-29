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
var interface_1 = require("./interface");
var Bluebird = require("bluebird");
var model = require('../../models');
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.create = function (user) {
        return model.User.create(user);
    };
    User.prototype.getAll = function () {
        return __awaiter(this, void 0, Bluebird, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.User.findAll({
                            order: ['name']
                        })
                            .then(interface_1.createUsers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    User.prototype.getById = function (id) {
        return __awaiter(this, void 0, Bluebird, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.User.findOne({
                            where: { id: id }
                        })
                            .then(interface_1.createUserById)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    User.prototype.getByEmail = function (email) {
        return __awaiter(this, void 0, Bluebird, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.User.findOne({
                            where: { email: email }
                        })
                            .then(interface_1.createUserByEmail)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    User.prototype.update = function (id, user) {
        return __awaiter(this, void 0, Bluebird, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.User.update(user, {
                            where: { id: id },
                            fields: ['name', 'email', 'password'],
                            hooks: true,
                            individualHooks: true
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    User.prototype.delete = function (id) {
        return __awaiter(this, void 0, Bluebird, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.User.destroy({
                            where: { id: id }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return User;
}());
exports.default = new User();
