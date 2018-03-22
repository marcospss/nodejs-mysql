'use strict';

module.exports = function(app) {
    const openConnection = app.db.connectionFactory(),
        projectsDao = new app.api.ProjectsDao(openConnection),
        galleryDao = new app.api.GalleryDao(openConnection),
        uploadFiles = new app.helpers.uploadFiles(),
        filesUpload = uploadFiles.multipleFields([{ name: 'cover', maxCount: 1 }, { name: 'gallery' }]),
        thumbnail = new app.helpers.thumbnail();

    let folderName = null,
        projectId = null;

    app.route('/dashboard/projects')
        .get((req, res) => {
            projectsDao.getAll(false, (error, data) => {
                if (error) {
                    res.status(500).json(error);
                    return;
                }
                res.status(200).json(data);
            })

        })
        .post(filesUpload, (req, res) => {

            const project = req.body,
                fileCover = (req.files && req.files.cover) ? req.files.cover : undefined,
                filesGallery = (req.files && req.files.gallery) ? req.files.gallery : undefined,
                filesUpload = (fileCover && filesGallery) ? fileCover.concat(filesGallery) : undefined,
                gallery = [];

            if (fileCover && !filesUpload) {
                fileCover.map(field => {
                    project.cover = field.filename;
                    thumbnail.create(field.destination, field.filename);
                });
            }

            projectsDao.add(project, (error, dataProject) => {
                if (error) {
                    res.status(500).json(error);
                    return;
                }
                // GALLERY
                if (filesUpload) {
                    projectId = dataProject.insertId;
                    filesUpload.map(field => {
                        if (field.fieldname === 'cover') {
                            project.cover = field.filename;
                            project.id = projectId;
                        } else {
                            gallery.push([field.filename, projectId]);
                        }
                        thumbnail.create(field.destination, field.filename);
                    });

                    projectsDao.update(project, (error, dataProjectUpdate) => {});

                    galleryDao.add(gallery, (error, dataGallery) => {
                        if (error) {
                            res.status(500).json(error);
                            return;
                        }
                        res.status(200).json({ message: 'registro inserido com sucesso' });
                    });
                } else {
                    res.status(200).json({ message: 'registro inserido com sucesso' });
                }
            });

        })
        .put((req, res) => {
            const project = req.body;
            projectsDao.update(project, (error, data) => {
                if (error) {
                    res.status(500).json(error);
                    return;
                }
                res.status(200).json(data);
            })

        });

    app.route('/dashboard/projects/:id')
        .get((req, res) => {
            const idProject = req.params.id;
            projectsDao.getById(idProject, (error, data) => {
                if (error) {
                    res.status(500).json(error);
                    return;
                }
                res.status(200).json(data);
            })

        })
        .delete((req, res) => {
            const idProject = req.params.id;
            projectsDao.delete(idProject, (error, data) => {
                if (error) {
                    res.status(500).json(error);
                    return;
                }
                res.status(200).json(data);
            })
        });

};