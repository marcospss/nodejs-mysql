"use strict";

const Chai = require('chai');
const expect = Chai.expect;
const DatabaseCleaner = require('database-cleaner');
const databaseCleaner = new DatabaseCleaner('mysql');

const app = require('./../../config/express');

describe("# - API USERS", () => {

    const connection = app.db.connectionFactory();
    const api = new app.api.UsersDao(connection);


    after(function(done) {
        databaseCleaner.clean(connection, function() {
            done();
        });
    });

    let id;

    const addUser = {
        name: 'Marcos Paulo',
        email: 'novo@usuario.com.br',
        password: 'novo-user',
        status: 1
    };

    it('- Deve adicionar um novo Usuário', (done) => {
        return api.add(addUser, (error, data) => {
            id = data.insertId;
            expect(data.affectedRows).to.be.equal(1);
            done();
        });

    });

    it('- Deve atualizar um Usuário', (done) => {
        const updateUser = {
            id: id,
            name: 'Marcos Paulo UPDATE',
            email: 'novo@usuario.com.br',
            password: 'novo-user',
            status: 0
        };
        return api.update(updateUser, (error, data) => {
            expect(data.affectedRows).to.be.equal(1);
            done();
        });

    });

    it('- Deve retornar um Usuário com o ID passado', (done) => {
        return api.getById(id, (error, data) => {
            expect(data[0]).to.have.all.keys(['id', 'name', 'email', 'password', 'status']);
            done();
        });

    });

    it('- Deve retornar uma lista com todos os Usuários', (done) => {
        return api.getAll((error, data) => {
            expect(data).to.be.an('array');
            done();
        });

    });

    it('- Deve remover um Usuário com o ID passado', (done) => {
        return api.delete(id, (error, data) => {
            expect(data.affectedRows).to.be.equal(1);
            done();
        });

    });

});