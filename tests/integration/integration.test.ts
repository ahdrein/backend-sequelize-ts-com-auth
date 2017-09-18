import { app, request, expect } from './config/helpers';
import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

describe('Routes: Books', () => {

  const defaultBook = {
    id: 1,
    name: 'Test Book',
  };

  describe('GET /', () => {
      it('Deve retornar a mensagem Hello, world', done => {
        request(app)
            .get('/')
            .end((error, res) => {
                expect(res.status).to.equal(200);
                expect(res.text).to.be.eql('Hello, world!');
                done(error);
            })
      })
  })

  describe('GET /books', () => {
    it('should return a list of books', done => {
      request(app)
        .get('/api/users/all')
        .end((error, res) => {
          expect(res.status).to.equal(200);
          done(error);
        });
    });
  });

});
