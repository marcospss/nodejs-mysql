'use strict';


module.exports = function(app) {
    const openConnection = app.db.connectionFactory(),
        api = new app.api.UsersDao(openConnection);

    app.route('/dashboard/users')
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
            const user = req.body;
            api.add(user, (error, data) => {
                if (error) {
                    res.status(500).json(error);
                    return;
                }
                res.status(200).json(data);
            })
        })
        .put((req, res) => {
            const user = req.body;
            api.update(user, (error, data) => {
                if (error) {
                    res.status(500).json(error);
                    return;
                }
                res.status(200).json(data);
            })

        });

    app.route('/dashboard/users/:id')
        .get((req, res) => {
            const idUser = req.params.id;
            api.getById(idUser, (error, data) => {
                if (error) {
                    res.status(500).json(error);
                    return;
                }
                res.status(200).json(data);
            })

        })
        .delete((req, res) => {
            const idUser = req.params.id;
            api.delete(idUser, (error, data) => {
                if (error) {
                    res.status(500).json(error);
                    return;
                }
                res.status(200).json(data);
            })
        });
};