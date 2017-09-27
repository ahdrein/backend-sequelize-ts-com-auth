import * as express from 'express';
import { Application } from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import Routes from './routes/routes';
import { errorHandlerApi } from './errorHandlerApi';
//const helmet = require('helmet');

class Api {
    
    public express: Application;

    constructor() {
        this.express = express();
        this.middleware();
    }

    middleware(): void {
        this.router(this.express);
        
	    this.express.use(function (req, res, next) {
	      res.setHeader('Access-Control-Allow-Origin', '*');
	      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	      next();
        });
        
        this.express.use(morgan('dev'));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json);
        //this.express.use(helmet());
        this.express.use(errorHandlerApi);
        
        
    }

    private router(app: Application): void {
        new Routes(app);
    }

}

export default new Api().express;