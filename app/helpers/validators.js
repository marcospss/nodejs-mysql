'use strict';

function validators() {

    return {
        imageFilter: (req, file, cb) => {
            // accept image only
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return cb(new Error('Only image files are allowed!'), false);
            }
            cb(null, true);
        }
    };

}

module.exports = () => validators;