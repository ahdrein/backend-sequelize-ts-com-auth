import * as http from 'http';
import Api from './api/api';
// import * as app from './config/server'

const models = require('./models');
//import models from './config/datasource';

const config = require('./config/env/config')();

const server = http.createServer(Api);

//let datasource = models(Api);

models.sequelize.sync().then(() => {
    server.listen(config.serverPort);
    server.on('listening', () => console.log(`Server está rodando na porta ${config.serverPort}`))
    server.on('error', (error: NodeJS.ErrnoException) => console.log(`Ocorreu um erro: ${error}`))
})

