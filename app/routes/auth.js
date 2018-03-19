const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = function(app) {
    const openConnection = app.db.connectionFactory(),
        api = new app.api.UsersDao(openConnection);

    app.route('/validateToken')
        .post((req, res) => {
            const token = req.body.token || '';

            jwt.verify(token, process.env.KEY_SECRET, function(err, decoded) {
                return res.status(200).send({ valid: !err });
            })

        });

    app.route('/login')
        .post((req, res) => {
            const salt = bcrypt.genSaltSync(10);
            const user = req.body;
            api.getByEmail(user, (error, data) => {
                if (error) {
                    return res.status(500).json(error);
                }
                if (!!data.length && bcrypt.compareSync(user.password, data[0].password)) {
                    const token = jwt.sign({ login: data[0].email }, process.env.KEY_SECRET, {
                        expiresIn: 1800
                    });
                    res.set('x-access-token', token);
                    res.status(200).json({ user: data[0].name, token: token });
                    //res.end();
                } else {
                    return res.status(401).json({ error: 'Login/senha inválidos' });
                }

            })
        });

    app.use('/dashboard/*', (req, res, next) => {
        // next();
        const token = req.headers['x-access-token'];

        if (!token) {
            return res.status(403).send({ error: 'Nenhum token enviado!' });
        }

        if (token) {
            jwt.verify(token, process.env.KEY_SECRET, function(err, decoded) {
                if (err) {
                    return res.status(403).json({ error: 'Token inválido!' });
                } else {
                    req.user = decoded;
                    next();
                }
            });

        };
    });
}