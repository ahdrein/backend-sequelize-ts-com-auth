import {  Response } from 'express';
import * as HTTPStatus from 'http-status';


  export function onSuccess(res: Response, data: any){
      return res.status(HTTPStatus.OK).json({ payload: data });
  }
