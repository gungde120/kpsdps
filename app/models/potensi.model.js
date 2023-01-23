const db = require("./db.js");

function dataPotensi(data){
    data.potensi_name = data.potensi_name;
    data.deskripsi = data.deskripsi;
}

const promiseQuery = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
}

const Potensi = {
    create: function(data) {
        data = dataPotensi(data);
        let sql = 'INSERT INTO potensi SET ?';
        return promiseQuery(sql, data);
    },

    getAll: function() {
        let sql = "SELECT potensi.potensi_id, potensi.potensi_name, potensi.deskripsi, (SELECT IFNULL(COUNT(1),0) FROM potensi_das WHERE potensi_das.potensi_id = potensi.potensi_id) AS 'jml_das' FROM potensi";
        return promiseQuery(sql);
    },

    get: function(id) {
        let sql = `SELECT das.das_id, das.thumbnail, das.das_name, sungai.sungai_name, das.alamat, kecamatan.kecamatan, kps.kps_name, das.luas_das, das.deskripsi, das.latitude, das.longitude FROM das LEFT OUTER JOIN kps ON kps.das_id = das.das_id LEFT OUTER JOIN sungai ON das.sungai_id = sungai.sungai_id LEFT OUTER JOIN kecamatan ON kecamatan.kecamatan_id = das.kecamatan_id INNER JOIN potensi_das ON potensi_das.das_id = das.das_id WHERE potensi_das.potensi_id = ?`;
        return promiseQuery(sql, [id]);
    },

    update: function(id, data) {
        data = dataPotensi(data);
        let sql = "UPDATE potensi SET ? WHERE potensi_id = ?";
        return promiseQuery(sql, [data, id]);
    },

    delete: function(id) {
        let sql = "DELETE FROM potensi WHERE potensi_id = ?";
        return promiseQuery(sql, [id]);
    }
};

module.exports = { Potensi };