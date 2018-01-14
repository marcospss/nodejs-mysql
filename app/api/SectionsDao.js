'use strict';

class SectionsDao {
    constructor(connection) {
        this._connection = connection;
    }

    getAll(callback) {
        this._connection.query('SELECT id, slug, title, meta_keywords, meta_description, description, status  FROM sections', callback);
    }

    getById(idSection, callback) {
        this._connection.query('SELECT id, slug, title, meta_keywords, meta_description, description, status  FROM sections WHERE id = ?', [idSection], callback);
    }

    add(section, callback) {
        this._connection.query('INSERT INTO sections SET ?', section, callback);
    }

    update(section, callback) {
        this._connection.query('UPDATE sections SET slug = ?, title = ?, meta_keywords = ?, meta_description = ?, description = ?, status = ? WHERE id = ?', [section.slug, section.title, section.meta_keywords, section.meta_description, section.description, section.status, section.id], callback);
    }

    delete(idSection, callback) {
        this._connection.query('DELETE FROM sections WHERE id = ?', idSection, callback);
    }
}

module.exports = () => SectionsDao;