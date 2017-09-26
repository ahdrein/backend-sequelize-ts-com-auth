import * as httpStatus from 'http-status';
import { app, request, expect } from './config/helpers';
const model = require('../../server/models');


describe('Routes: Teste de Integração - User', () => {

  'use strict';
  const config = require('../../server/config/env/config')();

  let id;

  const userTest = {
    id: 100,
    name: 'Usuário Teste',
    email: 'teste@email.com',
    password: 'teste'
  };

  const userDefault = {
    id: 1,
    name: 'Default User',
    email: 'default@gmail.com',
    password: 'default'
  };

  beforeEach((done) => {
    model.User.destroy({
      where: {}
    })
    .then(() => {
      return model.User.create(userDefault);
    })
    .then(user => {
      model.User.create(userTest)
        .then(() => {
          done();
        })
    })
  });
  
  describe('GET /api/users/all', () => {
    it('Deve retornar um Array com todos os Usuários', done => {
      request(app)
        .get('/api/users/all')
        .end((error, res) => {
          expect(res.status).to.equal(httpStatus.OK);
          expect(res.body.payload).to.be.an('array');
          expect(res.body.payload[0].name).to.be.equal(userDefault.name);
          expect(res.body.payload[0].email).to.be.equal(userDefault.email);
          done(error);
        });
    });
  });

  describe('GET /api/users/:id', () => {
    it('Deve retornar um Array com apenas um Usuário', done => {
      request(app)
        .get(`/api/users/${userDefault.id}`)
        .end((error, res) => {
          expect(res.status).to.equal(httpStatus.OK);
          expect(res.body.payload.id).to.equal(userDefault.id);
          expect(res.body.payload).to.have.all.keys([
            'id', 'name', 'email', 'password'
          ]);
          done(error);
        });
    });
  });

  describe('POST /api/users/create', () => {
    it('Deve criar um novo Usuário', done => {
      const  user = {
        id: 2,
        name: 'Usuario Teste',
        email: 'usuario@email.com',
        password: 'novouser'
      };

      request(app)
        .post('/api/users/create')
        .send(user)
        .end((error, res) => {
          expect(res.status).to.equal(httpStatus.OK);
          expect(res.body.payload.id).to.eql(user.id);
          expect(res.body.payload.name).to.eql(user.name);
          expect(res.body.payload.email).to.eql(user.email);
          done(error);
        });
    });
  });


  describe('PUT /api/users/:id/update', () => {
    it('Deve atualizar um Usuário', done => {
      const  user = {
        name: 'TesteUpdate',
        email: 'update@email.com'
      }

      request(app)
        .put(`/api/users/${userTest.id}/update`)
        .send(user)
        .end((error, res) => {
          expect(res.status).to.equal(httpStatus.OK);
          expect(res.body.payload[0]).to.eql(1);
          done(error);
        });
    });
  });


  describe('DELETE /api/users/:id/destroy', () => {
    it('Deve deletar um Usuário', done => {
      request(app)
        .del(`/api/users/${userTest.id}/destroy`)
        .end((error, res) => {
          expect(res.status).to.equal(httpStatus.OK);
	        expect(res.body.payload).to.eql(1);
          done(error);
        });
    });
  });

  /*
  describe('GET /', () => {
      it('Deve retornar a mensagem Hello, world', done => {
        request(app)
            .get('/')
            .end((error, res) => {
                expect(res.status).to.equal(httpStatus.OK);
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
 */
});
