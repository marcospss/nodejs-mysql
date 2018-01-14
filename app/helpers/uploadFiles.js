'use strict';

const fs = require('fs'),
    multer = require('multer'),
    UPLOAD_PATH = 'public/images/works',
    mkdirp = require('mkdirp'),
    del = require('del'),
    validators = require('./validators');

let folderName = null;

// destination: lida com o destino
// filename: permite definir o nome do arquivo gravado
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        folderName = `${UPLOAD_PATH}/${req.body.folder_files}`;
        mkdirp(folderName, (err) => {
            if (err) {
                return cb(new Error('Não foi possível criar a pasta'), folderName);
            } else {
                cb(null, folderName);
            }
        });
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// utiliza a storage para configurar a instância do multer
const config = multer({ storage, fileFilter: validators.imageFilter }),
    filesUpload = config.fields([{ name: 'cover', maxCount: 1 }, { name: 'gallery' }]);

function uploadFiles() {

    return {
        config: config,
        multipleFields: (arrayFields) => {
            return config.fields(arrayFields)
        },
        createFolder: (folderPath) => {
            let result = false;
            mkdirp(folderPath, (err) => {
                result = (err) ? false : true;
            });
            return result;
        },
        cleanFolder: (folderPath) => {
            // delete files inside folder but not the folder itself
            del.sync([`${folderPath}/**`, !UPLOAD_PATH]);
        }
    };

}

module.exports = () => uploadFiles;