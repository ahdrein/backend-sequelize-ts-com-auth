"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPStatus = require("http-status");
var jwt = require("jwt-simple");
var bcrypt = require("bcrypt");
var config = require('../../config/env/config')();
function authSuccess(res, credentials, data) {
    var isMatch = bcrypt.compareSync(credentials.password, data.password);
    if (isMatch) {
        var payload = { id: data.id };
        return res.json({
            token: jwt.encode(payload, config.secret)
        });
    }
    else {
        return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
}
exports.default = authSuccess;
