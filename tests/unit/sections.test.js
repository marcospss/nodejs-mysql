"use strict";

const Chai = require('chai');
const expect = Chai.expect;
const DatabaseCleaner = require('database-cleaner');
const databaseCleaner = new DatabaseCleaner('mysql');

const app = require('./../../config/express');

describe("# - API SECTIONS", () => {

    const connection = app.db.connectionFactory();
    const api = new app.api.SectionsDao(connection);


    after(function(done) {
        databaseCleaner.clean(connection, function() {
            done();
        });
    });

    let id;

    const addSection = {
        slug: 'web',
        title: 'Web Design',
        meta_keywords: 'web-design',
        meta_description: 'web-design',
        description: '<p>O web design pode ser visto como uma extens&atilde;o da pr&aacute;tica do design.</p>',
        status: 1
    };

    it('- Deve adicionar uma nova Seção', (done) => {
        return api.add(addSection, (error, data) => {
            id = data.insertId;
            expect(data.affectedRows).to.be.equal(1);
            done();
        });

    });

    it('- Deve atualizar uma Seção', (done) => {
        const updateSection = {
            id: id,
            slug: 'web-design',
            title: 'Web Design',
            meta_keywords: 'web design prototipo',
            meta_description: 'O web design pode ser visto como uma extens&atilde;o da pr&aacute;tica do design.',
            description: '<p>O web design pode ser visto como uma extens&atilde;o da pr&aacute;tica do design.</p>',
            status: 0
        };
        return api.update(updateSection, (error, data) => {
            expect(data.affectedRows).to.be.equal(1);
            done();
        });

    });

    it('- Deve retornar uma Seção com o ID passado', (done) => {
        return api.getById(id, (error, data) => {
            expect(data[0]).to.have.all.keys(['description', 'id', 'meta_description', 'meta_keywords', 'slug', 'status', 'title']);
            done();
        });

    });

    it('- Deve retornar uma lista com todas as Seções', (done) => {
        return api.getAll((error, data) => {
            expect(data).to.be.an('array');
            done();
        });

    });

    it('- Deve remover uma Seção com o ID passado', (done) => {
        return api.delete(id, (error, data) => {
            expect(data.affectedRows).to.be.equal(1);
            done();
        });

    });

});