"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPStatus = require("http-status");
var config = require('../../config/env/config')();
function onSuccess(res, data) {
    return res.status(HTTPStatus.OK).json({ payload: data });
}
exports.onSuccess = onSuccess;
function onError(res, message, err) {
    console.log("Error: " + err);
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(message);
}
exports.onError = onError;
