'use strict';


module.exports = function(app) {
    const openConnection = app.db.connectionFactory(),
        projects = new app.api.ProjectsDao(openConnection),
        sections = new app.api.SectionsDao(openConnection);

    app.route('/highlight')
        .get((req, res) => {
            projects.getHighlight((error, data) => {
                if (error) {
                    res.status(500).json(error);
                    return;
                }
                res.status(200).json(data);
            });

        });

    app.route('/projects')
        .get((req, res) => {
            projects.getAll(true, (error, data) => {
                if (error) {
                    res.status(500).json(error);
                    return;
                }
                res.status(200).json(data);
            });

        });

    app.route('/project/:slugProject')
        .get((req, res) => {
            const slugProject = req.params.slugProject;
            projects.getBySlug(slugProject, (error, data) => {
                if (error) {
                    res.status(500).json(error);
                    return;
                }
                res.status(200).json(data);
            });

        });

    app.route('/projects/related/:idSection/:idProject')
        .get((req, res) => {
            const idSection = req.params.idSection,
                idProject = req.params.idProject;
            projects.getRelated(idSection, idProject, (error, data) => {
                if (error) {
                    res.status(500).json(error);
                    return;
                }
                res.status(200).json(data);
            });

        });

    app.route('/section')
        .get((req, res) => {
            sections.getAll((error, data) => {
                if (error) {
                    res.status(500).json(error);
                    return;
                }
                res.status(200).json(data);
            });

        });

    app.route('/section/:slugSection')
        .get((req, res) => {
            const slugSection = req.params.slugSection;
            projects.getBySection(slugSection, (error, data) => {
                if (error) {
                    res.status(500).json(error);
                    return;
                }
                res.status(200).json(data);
            });

        });

    app.route('/')
        .get((req, res) => {
            const data = {
                "description": "Descrição dos endpoints da API",
                "highlight": {
                    "description": "Retorna todos os destaques que são exibidos na home"
                },
                "projects": {
                    "description": "Retorna todos os projetos ativos"
                },
                "project/:slugProject": {
                    "description": "Retorna o projeto pela url slug"
                },
                "projects/related/:idSection/:idProject": {
                    "description": "Retorna os projetos relacionados pela seção"
                },
                "section": {
                    "description": "Retorna todas as seções"
                },
                "section/:slugSection": {
                    "description": "Retorna a seção pela url slug"
                }
            };
            res.status(200).json(data);
        });
};