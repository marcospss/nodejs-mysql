const jwt = require('jsonwebtoken');

module.exports = function(app) {
    const openConnection = app.db.connectionFactory(),
        api = new app.api.UsersDao(openConnection);

    app.route('/login')
        .post((req, res) => {
            const user = req.body;
            api.getByEmailAndPassword(user, (error, data) => {

                if (error) {
                    res.status(500).json(error);
                    return;
                }

                if (!!data.length) {
                    const token = jwt.sign({ login: data.email }, app.get('keySecret'), {
                        expiresIn: 1800
                    });
                    res.set('x-access-token', token);
                    res.end();
                } else {
                    res.status(401).json('Login/senha inválidos');
                }

            })
        });

    app.use('/dashboard/*', (req, res, next) => {

        const token = req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, app.get('keySecret'), function(err, decoded) {
                if (err) {
                    res.status(401).json('Token rejeitado');
                } else {
                    req.user = decoded;
                    next();
                }
            });

        } else {
            res.status(401).json('Nenhum token enviado');
        }
    });
}