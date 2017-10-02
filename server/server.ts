import * as http from 'http';
import Api from './api/api';
import * as cluster from 'cluster';

const models = require('./models');
const numCPUs = require('os').cpus().length;

const config = require('./config/env/config')();

let PORT = config.serverPort;
if (process.env.NODE_ENV == 'production') {
    PORT = process.env.PORT;
}

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
  
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    //http.createServer((req, res) => {
    //  res.writeHead(200);
    //  res.end('hello world\n');
    //}).listen(8000);

    const server = http.createServer(Api);

    models.sequelize.sync().then(() => {
        server.listen(PORT);
        server.on('listening', () => console.log(`Servidor está rodando na porta ${PORT}`))
        server.on('error', (error: NodeJS.ErrnoException) => console.log(`Ocorreu um erro: ${error}`))
    })
  
    console.log(`Worker ${process.pid} started`);
}


