'use strict';

class ProjectsDao {
    constructor(connection) {
        this._connection = connection;
    }

    add(project, callback) {
        this._connection.query('INSERT INTO projects SET ?', project, callback);
    }

    update(project, callback) {
        this._connection.query('UPDATE projects SET slug = ?, title = ?, meta_keywords = ?, meta_description = ?, description = ?, highlight = ?, cover = ?, link = ?, order_display = ?, section_id = ?, status = ? WHERE id = ?', [project.slug, project.title, project.meta_keywords, project.meta_description, project.description, project.highlight, project.cover, project.link, project.order_display, project.section_id, project.status, project.id], callback);
    }

    delete(idProject, callback) {
        this._connection.query('DELETE FROM projects WHERE id = ?', idProject, callback);
    }

    getAll(callback) {
        this._connection.query(`
            SELECT DISTINCT 
            P.id, P.slug, P.title, P.meta_keywords, P.meta_description, P.description, 
            P.folder_files, P.highlight, P.cover, P.link, 
            P.order_display, P.section_id, P.status, P.data_insert, SEC.title AS category,
            GROUP_CONCAT(DISTINCT G.file_name) gallery 

            FROM projects AS P
            LEFT JOIN sections AS SEC 
            ON SEC.id = P.section_id
            LEFT JOIN gallery AS G
            ON G.project_id = P.id
            GROUP BY P.id 
            ORDER BY P.id DESC, gallery ASC
            `, callback);
    }

    getHighlight(callback) {
        this._connection.query(`
        SELECT DISTINCT
        P.id, P.slug, P.title, P.meta_description, P.description, P.cover, P.order_display, P.folder_files
        FROM projects AS P
        WHERE highlight = '1' 
        AND status = '1'
        ORDER BY P.order_display ASC
        LIMIT 0,16
        `, callback);
    }

    getBySlug(slugProject, callback) {
        this._connection.query(`
        SELECT DISTINCT 
        P.id, P.slug, P.title, P.meta_keywords, P.meta_description, P.description, 
        P.folder_files, P.highlight, P.cover, P.link, 
        P.order_display, P.section_id, P.status, SEC.title AS category,
        GROUP_CONCAT(DISTINCT CONCAT(G.id,':',G.file_name) ORDER BY G.file_name ASC  SEPARATOR ',') AS gallery

        FROM projects AS P
        LEFT JOIN sections AS SEC 
        ON SEC.id = P.section_id
        LEFT JOIN gallery AS G
        ON G.project_id = P.id
        WHERE P.slug = ? 
        GROUP BY P.id 
        ORDER BY gallery ASC
        `, [slugProject], callback);
    }

    getBySection(slugSection, callback) {
        this._connection.query(`
        SELECT DISTINCT 
        P.id, P.slug, P.title, P.meta_keywords, P.meta_description, P.description, 
        P.folder_files, P.highlight, P.cover, P.link, 
        P.order_display, P.section_id, P.status, SEC.title AS category,
        GROUP_CONCAT(DISTINCT CONCAT(G.id,':',G.file_name) ORDER BY G.file_name ASC  SEPARATOR ',') AS gallery

        FROM projects AS P
        JOIN sections AS SEC 
        ON SEC.id = P.section_id
        LEFT JOIN gallery AS G
        ON G.project_id = P.id
        WHERE SEC.slug = ? 
        GROUP BY P.id 
        ORDER BY P.id DESC, gallery ASC
        `, [slugSection], callback);
    }

    getRelated(idSection, idProject, callback) {
        this._connection.query(`
        SELECT DISTINCT
        P.id, P.slug, P.title, P.meta_description, P.description, P.cover
        FROM projects AS P
        WHERE section_id = ?
        AND NOT id = ?
        GROUP BY P.id 
        ORDER BY P.id DESC
        LIMIT 0,5
        `, [idSection, idProject], callback);

    }

}

module.exports = () => ProjectsDao;