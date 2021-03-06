const { gfs } = require('../middleware/file-storage');

// returns chunked data for files from db
module.exports = {
    findFile: function(req, res) {
        gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
           if(!files || files.length === 0){
              return res.status(404).json({
                 message: "Could not find file"
              });
           }

           var readstream = gfs.createReadStream({
              filename: files[0].filename
           })
           res.set('Content-Type', files[0].contentType);
           return readstream.pipe(res);
        });
    }
}
