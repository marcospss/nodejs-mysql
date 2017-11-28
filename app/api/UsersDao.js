'use strict';

class UsersDao {
    constructor(connection) {
        this._connection = connection;
    }

    getAll(callback) {
        this._connection.query('SELECT id, name, email, password, status  FROM users', callback);
    }

    getById(idUser, callback) {
        this._connection.query('SELECT id, name, email, password, status  FROM users WHERE id = ?', [idUser], callback);
    }

    getByEmailAndPassword(user, callback) {
        this._connection.query('SELECT id, name, email, password, status  FROM users WHERE email = ? and password = ?', [user.email, user.password], callback);
    }

    add(user, callback) {
        this._connection.query('INSERT INTO users SET ?', user, callback);
    }

    update(user, callback) {
        this._connection.query('UPDATE users SET name = ?, email = ?, password = ?, status = ? WHERE id = ?', [user.name, user.email, user.password, user.status, user.id], callback);
    }

    delete(idUser, callback) {
        this._connection.query('DELETE FROM users WHERE id = ?', idUser, callback);
    }
}

module.exports = function() {
    return UsersDao;
};