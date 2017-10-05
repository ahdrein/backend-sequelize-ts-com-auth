import { Request, Response } from 'express';
import * as _ from 'lodash';
import UserService from '../User/service';
import Handlers from '../../api/responses/handlers';
import * as Bluebird from 'bluebird';

class TokenRoutes {

  auth(req: Request, res: Response) {
    const credentials = {
      email: req.body.email,
      password: req.body.password
    };

    if(credentials.hasOwnProperty('email') && credentials.hasOwnProperty('password')) {
        UserService
        .getByEmail(credentials.email)
        .then(_.partial(Handlers.authSuccess, res, credentials))
        .catch(_.partial(Handlers.authFail, req, res));
    }
  }
}

export default new TokenRoutes();
