const db = require("./db.js");
var multer  = require('multer');
const path = require('path');

function dataDas(data, file){
    data.das_name = data.das_name;
    data.sungai_id = data.sungai_id;
    data.kecamatan_id = data.kecamatan_id;
    data.alamat = data.alamat;
    data.luas_das = data.luas_das;
    data.latitude = data.latitude;
    data.longitude = data.longitude;
    data.deskripsi = data.deskripsi;
    if(file) data.thumbnail = file.filename;
    data.maps_url = data.maps_url;
    return data;
}

const storage = multer.diskStorage({
    destination : path.join(__dirname + './../public/images/das/'),
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + file.originalname);
    }
});

const upload = multer({ storage });

const promiseQuery = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
}

const Das = {
    create: function(data, file) {
        data = dataDas(data, file);
        let sql = 'INSERT INTO das SET ?';
        return promiseQuery(sql, data);
    },


    getAll: function() {
        let sql = "SELECT das.das_id, das.thumbnail, das.das_name, sungai.sungai_name, das.alamat, kecamatan.kecamatan, kps.kps_name, das.luas_das, das.deskripsi, das.latitude, das.longitude, (SELECT IFNULL(COUNT(1),0) FROM potensi_das WHERE potensi_das.das_id = das.das_id) AS 'jml_potensi' FROM das LEFT OUTER JOIN kps ON kps.das_id = das.das_id JOIN sungai ON das.sungai_id = sungai.sungai_id JOIN kecamatan ON kecamatan.kecamatan_id = das.kecamatan_id GROUP BY das_id";
        return promiseQuery(sql);
    },

    get: function(id) {
        let sql = `SELECT das.das_id, das.thumbnail, das.das_name, sungai.sungai_name, das.alamat, kecamatan.kecamatan, kps.kps_name, das.luas_das, das.deskripsi, das.latitude, das.longitude, (SELECT IFNULL(COUNT(1),0) FROM potensi_das WHERE potensi_das.das_id = das.das_id) AS 'jml_potensi' FROM das LEFT OUTER JOIN kps ON kps.das_id = das.das_id JOIN sungai ON das.sungai_id = sungai.sungai_id JOIN kecamatan ON kecamatan.kecamatan_id = das.kecamatan_id WHERE das.das_id = ?`;
        return promiseQuery(sql, [id]);
    },

    update: function(id, data, file) {
        data = dataDas(data, file);
        let sql = "UPDATE das SET ? WHERE das_id = ?";
        return promiseQuery(sql, [data, id]);
    },

    delete: function(id) {
        let sql = "DELETE FROM das WHERE das_id = ?";
        return promiseQuery(sql, [id]);
    }
};

module.exports = { Das, upload };