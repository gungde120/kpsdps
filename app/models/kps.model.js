const db = require("./db.js");
var multer  = require('multer');
const path = require('path');

function dataKps(data, file){
    data.kps_name = data.kps_name;
    data.das_id = data.das_id;
    data.tgl_dibentuk = data.tgl_dibentuk;
    data.jml_anggota = data.jml_anggota;
    data.facebook = data.facebook;
    data.profil_kps = data.profil_kps;
    if(file) data.logo_kps = file.filename;
    data.instagram = data.deskripsi;
    return data;
}

const storage = multer.diskStorage({
    destination : path.join(__dirname + './../public/images/logo/'),
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

const Kps = {
    create: function(data, file) {
        data = dataKps(data, file);
        let sql = 'INSERT INTO kps SET ?';
        return promiseQuery(sql, data);
    },

    getAll: function() {
        let sql = "SELECT kps.kps_id, kps.logo_kps, kps.kps_name, das.das_name, das.alamat, kecamatan.kecamatan, kps.tgl_dibentuk, kps.jml_anggota, kps.profil_kps, kps.facebook, kps.instagram FROM kps JOIN das ON das.das_id = kps.das_id JOIN kecamatan ON kecamatan.kecamatan_id = das.kecamatan_id ORDER BY kps_id";
        return promiseQuery(sql);
    },

    get: function(id) {
        let sql = `SELECT kps.kps_id, kps.logo_kps, kps.kps_name, das.das_name, das.alamat, kecamatan.kecamatan, kps.tgl_dibentuk, kps.jml_anggota, kps.profil_kps, kps.facebook, kps.instagram FROM kps JOIN das ON das.das_id = kps.das_id JOIN kecamatan ON kecamatan.kecamatan_id = das.kecamatan_id WHERE kps.kps_id = ?`;
        return promiseQuery(sql, [id]);
    },

    update: function(id, data, file) {
        data = dataKps(data, file);
        let sql = "UPDATE kps SET ? WHERE kps_id = ?";
        return promiseQuery(sql, [data, id]);
    },

    delete: function(id) {
        let sql = "DELETE FROM kps WHERE kps_id = ?";
        return promiseQuery(sql, [id]);
    }
};

module.exports = { Kps, upload };
