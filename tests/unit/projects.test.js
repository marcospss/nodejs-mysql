"use strict";

const Chai = require('chai');
const expect = Chai.expect;
const DatabaseCleaner = require('database-cleaner');
const databaseCleaner = new DatabaseCleaner('mysql');

const app = require('./../../config/express');

describe("# - API PROJECTS", () => {

    const connection = app.db.connectionFactory();
    const api = new app.api.ProjectsDao(connection);


    after(function(done) {
        databaseCleaner.clean(connection, function() {
            done();
        });
    });

    let id;

    const addProject = {
        slug: "cerveja-franziskaner-kristall-klar",
        title: "Cerveja Franziskaner Kristall Klar 500ml",
        meta_keywords: "cerveja, franziskaner, kristall, ale, german, kristallweizen",
        meta_description: "Cerveja Franziskaner Hefe-Weissbier Hell - 500ml do país Alemanha com 5,2% de álcool, produzida pela Cervejaria Spaten-Franziskaner-Bräu.",
        description: "<p>A Cerveja Franziskaner Kristall Klar 500ml passa por uma filtragem especial, que elimina a base de fermento da garrafa e possui o mais alto grau de carbonatação dentre os produtos da cervejaria Franziskaner. Esse resultado, produz uma cerveja de trigo com cor cristalina de sabor leve, refrescante e aroma levemente frutado.</p>",
        folder_files: "cerveja-franziskaner-kristall-klar",
        highlight: 1,
        cover: null,
        link: "",
        order_display: 1,
        section_id: 2,
        status: 1
    };

    let updateProject = {
        slug: "deus-brut-des-flandres",
        title: "DeuS Brut des Flandres 750ml",
        meta_keywords: "DeuS, Brut, des, Flandres",
        meta_description: "Com uma produção limitada a 15 mil garrafas por ano, a cerveja Deus passa por um longo processo de fermentação.",
        description: "<p>Com uma produção limitada a 15 mil garrafas por ano, a cerveja Deus passa por um longo processo de fermentação. Na primeira etapa, na Bélgica, são usados apenas puro malte e água. Em seguida, o líquido segue para a cidade de Reims, região de Champagne (França), onde é colocada em garrafas de champanhe e passa pelo mesmo processo do vinho local, ou seja, fica repousando nas caves, para a segunda fermentação.A suavidade única desta cerveja começa nos elegantes contornos de sua garrafa. É de cor clara, dourada, brilhante, efervescente e com bolhas extremamente minúsculas, sendo coroada por um colarinho branco. Seu aroma é extremamente complexo, desenvolvendo fragrâncias de maçãs frescas, hortelã, tomilho, gengibre, malte, pêras, lúpulo, pimenta-da-jamaica e cravo-da-índia. Seu sabor também é complexo, mas refrescante e delicado, não deixando transparecer sua graduação alcoólica elevada.</p>",
        highlight: 1,
        cover: null,
        link: "",
        order_display: 2,
        section_id: 2,
        status: 1
    };

    it('- Deve adicionar um novo Projeto', (done) => {
        return api.add(addProject, (error, data) => {
            id = data.insertId;
            expect(data.affectedRows).to.be.equal(1);
            done();
        });

    });

    it('- Deve atualizar um Projeto', (done) => {
        updateProject.id = id;
        return api.update(updateProject, (error, data) => {
            expect(data.affectedRows).to.be.equal(1);
            done();
        });
    });

    it('- Deve retornar um Projeto com o slug passado', (done) => {
        return api.getBySlug(updateProject.slug, (error, data) => {
            expect(data[0]).to.have.all.keys(['id', 'slug', 'title', 'meta_keywords', 'meta_description', 'description', 'folder_files', 'highlight', 'cover', 'link', 'order_display', 'section_id', 'status', 'category', 'gallery']);
            done();
        });
    });

    it('- Deve retornar uma lista com todos os Projetos', (done) => {
        return api.getAll((error, data) => {
            expect(data).to.be.an('array');
            done();
        });
    });

    it('- Deve remover uma projeto com o ID passado', (done) => {
        return api.delete(id, (error, data) => {
            expect(data.affectedRows).to.be.equal(1);
            done();
        });

    });


});