'use strict';


module.exports = function(app) {
    const openConnection = app.db.connectionFactory(),
        api = new app.api.SectionsDao(openConnection);

    app.route('/dashboard/sections')
        .get((req, res) => {
            api.getAll((error, data) => {
                if (error) {
                    res.status(500).json(error);
                    return;
                }
                res.status(200).json(data);
            })

        })
        .post((req, res) => {
            const category = req.body;
            api.add(category, (error, data) => {
                if (error) {
                    res.status(500).json(error);
                    return;
                }
                res.status(200).json(data);
            })
        })
        .put((req, res) => {
            const category = req.body;
            api.update(category, (error, data) => {
                if (error) {
                    res.status(500).json(error);
                    return;
                }
                res.status(200).json(data);
            })

        });

    app.route('/dashboard/sections/:id')
        .get((req, res) => {
            const idCategory = req.params.id;
            api.getById(idCategory, (error, data) => {
                if (error) {
                    res.status(500).json(error);
                    return;
                }
                res.status(200).json(data);
            })

        })
        .delete((req, res) => {
            const idCategory = req.params.id;
            api.delete(idCategory, (error, data) => {
                if (error) {
                    res.status(500).json(error);
                    return;
                }
                res.status(200).json(data);
            })
        });
};