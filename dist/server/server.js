"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var api_1 = require("./api/api");
var cluster = require("cluster");
var models = require('./models');
var numCPUs = require('os').cpus().length;
var config = require('./config/env/config')();
if (cluster.isMaster) {
    console.log("Master " + process.pid + " is running");
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', function (worker, code, signal) {
        console.log("worker " + worker.process.pid + " died");
    });
}
else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    //http.createServer((req, res) => {
    //  res.writeHead(200);
    //  res.end('hello world\n');
    //}).listen(8000);
    var server_1 = http.createServer(api_1.default);
    models.sequelize.sync().then(function () {
        server_1.listen(config.serverPort);
        server_1.on('listening', function () { return console.log("Server est\u00E1 rodando na porta " + config.serverPort); });
        server_1.on('error', function (error) { return console.log("Ocorreu um erro: " + error); });
    });
    console.log("Worker " + process.pid + " started");
}
