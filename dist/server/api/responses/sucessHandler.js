"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPStatus = require("http-status");
function onSuccess(res, data) {
    return res.status(HTTPStatus.OK).json({ payload: data });
}
exports.onSuccess = onSuccess;
