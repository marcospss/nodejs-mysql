const gm = require('gm').subClass({ imageMagick: true });

function thumbnail() {

    return {
        create: (destinationFolder, fileName) => {
            let result = null;
            gm(`${destinationFolder}/${fileName}`)
                .thumbnail(480, 480)
                .noProfile()
                .write(`${destinationFolder}/thumb-${fileName}`, function(err) {
                    if (!err) {
                        console.log('thumbnail -> ', destinationFolder, fileName)
                    }
                });
        }
    };

}

module.exports = () => thumbnail;