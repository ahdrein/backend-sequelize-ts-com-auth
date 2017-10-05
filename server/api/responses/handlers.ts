import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import * as HTTPStatus from 'http-status';
// import * as jwt from 'jwt-simple';
import * as bcrypt from 'bcrypt';
const config = require('../../config/env/config')();

const jwt = require('jsonwebtoken');

class Handlers {

  constructor(){}

  onSuccess(res: Response, data: any, statusCode: number = HTTPStatus.OK){
      return res.status(statusCode)
                .json({ data, statusCode });
  }

  onError(res: Response, message: string, err: any, statusCode = HTTPStatus.BAD_REQUEST) {
    console.log(`Error: ${err}`);
    return res.status(statusCode)
              .send({
                error: message,
                status: statusCode,
                timestamp: new Date(),
                pageError: `https://erros.backend-sequelized-ts.com/${statusCode}`
              });
  }

  authSuccess(res: Response, credentials: any, data: any) {
    const isMatch = bcrypt.compareSync(credentials.password, data.password);
    if(isMatch) {
      const payload = { id: data.id };

      const token = jwt.sign({
        id: data.id
      }, config.secret, {
        expiresIn: "1 day",
        audience: 'myapp.com',
        issuer: 'myApp'
      })
      const { name, email } = data;

      return res.json({
                // token: jwt.encode(payload, config.secret)
                name, email, token

             });
    } else {
      // return res.sendStatus(HTTPStatus.UNAUTHORIZED);
      res.status(400).send({ errors: ['Usuário/Senha inválidos'] })
    }
  }

  authFail(req: Request, res: Response) {
    return res.sendStatus(HTTPStatus.UNAUTHORIZED);
  }

  dbErrorHandler(res: Response, err: any){
    console.log(`Um erro aconteceu: ${err}`);
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      code: 'ERR-01',
      message: 'Erro ao criar usuário'
    });
  }

  errorHandlerApi(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction){
    console.error(`API error handler foi executada: ${err}`);
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      errorCode: 'ERR-001',
      message: 'Erro Interno do Servidor'
    });
  }
}


export default new Handlers();
