const db = require("./db.js");

function dataKecamatan(data){
    data.kecamatan = data.kecamatan;
}

const promiseQuery = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
}

const Kecamatan = {
    create: function(data) {
        data = dataKecamatan(data);
        let sql = 'INSERT INTO kecamatan SET ?';
        return promiseQuery(sql, data);
    },

    getAll: function() {
        let sql = "SELECT kecamatan.kecamatan_id, kecamatan.kecamatan, (SELECT IFNULL(COUNT(1),0) FROM das WHERE das.kecamatan_id = kecamatan.kecamatan_id) AS 'jml_das', (SELECT IFNULL(COUNT(1),0) FROM kps JOIN das WHERE kps.das_id = das.das_id AND das.kecamatan_id = kecamatan.kecamatan_id) AS 'jml_kps' FROM kecamatan";
        return promiseQuery(sql);
    },

    getDasByKecamatan: function(id) {
        let sql = `SELECT das.das_id, das.thumbnail, das.das_name, sungai.sungai_name ,das.alamat, kps.kps_name, das.luas_das, das.deskripsi, das.latitude, das.longitude, (SELECT IFNULL(COUNT(1),0) FROM potensi_das WHERE potensi_das.das_id = das.das_id) AS 'jml_potensi' FROM das LEFT OUTER JOIN kps ON das.das_id = kps.das_id LEFT OUTER JOIN sungai ON sungai.sungai_id = das.sungai_id WHERE das.kecamatan_id = ?`;
        return promiseQuery(sql, [id]);
    },

    getKpsByKecamatan: function(id) {
        let sql = `SELECT kps.kps_id, kps.logo_kps, kps.kps_name, das.das_name, das.alamat, kecamatan.kecamatan, kps.tgl_dibentuk, kps.jml_anggota, kps.profil_kps, kps.facebook, kps.instagram FROM kps JOIN das ON das.das_id = kps.das_id JOIN kecamatan ON kecamatan.kecamatan_id = das.kecamatan_id WHERE das.kecamatan_id = ?`;
        return promiseQuery(sql, [id]);
    },

    update: function(id, data) {
        data = dataKecamatan(data);
        let sql = "UPDATE kecamatan SET ? WHERE kecamatan_id = ?";
        return promiseQuery(sql, [data, id]);
    },

    delete: function(id) {
        let sql = "DELETE FROM kecammatan WHERE kecamatan_id = ?";
        return promiseQuery(sql, [id]);
    }
};

module.exports = { Kecamatan };