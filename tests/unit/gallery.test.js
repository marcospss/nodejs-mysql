"use strict";

const Chai = require('chai');
const expect = Chai.expect;
const DatabaseCleaner = require('database-cleaner');
const databaseCleaner = new DatabaseCleaner('mysql');

const app = require('./../../config/express');

describe("# - API GALLERY", () => {

    const connection = app.db.connectionFactory();
    const api = new app.api.GalleryDao(connection);


    after(function(done) {
        databaseCleaner.clean(connection, function() {
            done();
        });
    });

    let id;

    const addMedia = {
        file_name: 'image-test.jpg',
        project_id: 30
    };

    it('- Deve adicionar uma nova imagem a galeria', (done) => {
        return api.add(addMedia, (error, data) => {
            id = data.insertId;
            expect(data.affectedRows).to.be.equal(1);
            done();
        });

    });

    it('- Deve retornar uma imagem com o ID passado', (done) => {
        return api.getById(id, (error, data) => {
            expect(data[0]).to.have.all.keys(['id', 'file_name', 'project_id']);
            expect(data[0].file_name).to.be.equal('image-test.jpg');
            done();
        });

    });

    it('- Deve retornar uma lista com todas as imagens, conforme o ID do conteúdo passado', (done) => {
        return api.getAllById(addMedia.project_id, (error, data) => {
            expect(data).to.be.an('array');
            done();
        });

    });

    it('- Deve remover uma imagem com o ID passado', (done) => {
        return api.deleteById(id, (error, data) => {
            expect(data.affectedRows).to.be.equal(1);
            done();
        });

    });


    it('- Deve remover todas as imagens do conteúdo, conforme o ID passado', (done) => {
        api.add(addMedia, (error, data) => {
            return api.deleteAll(addMedia.project_id, (error, data) => {
                expect(data.affectedRows).to.be.equal(1);
                done();
            });
        });


    });

});