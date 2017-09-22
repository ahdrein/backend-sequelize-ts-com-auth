"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var api_1 = require("./api/api");
// import * as app from './config/server'
var models = require('./models');
//import models from './config/datasource';
var config = require('./config/env/config')();
var server = http.createServer(api_1.default);
//let datasource = models(Api);
models.sequelize.sync().then(function () {
    server.listen(config.serverPort);
    server.on('listening', function () { return console.log("Server est\u00E1 rodando na porta " + config.serverPort); });
    server.on('error', function (error) { return console.log("Ocorreu um erro: " + error); });
});
