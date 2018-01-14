'use strict';

class GalleryDao {
    constructor(connection) {
        this._connection = connection;
    }

    getAllById(idProject, callback) {
        this._connection.query('SELECT id, file_name, project_id FROM gallery WHERE project_id = ?', [idProject], callback);
    }

    getById(idImage, callback) {
        this._connection.query('SELECT id, file_name, project_id FROM gallery WHERE id = ?', [idImage], callback);
    }

    add(media, callback) {
        this._connection.query('INSERT INTO gallery (file_name, project_id) VALUES ?', [media], callback);
    }

    deleteById(idImage, callback) {
        this._connection.query('DELETE FROM gallery WHERE id = ?', idImage, callback);
    }

    deleteAll(idProject, callback) {
        this._connection.query('DELETE FROM gallery WHERE project_id = ?', idProject, callback);
    }
}

module.exports = () => GalleryDao;