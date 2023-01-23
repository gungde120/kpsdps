const db = require("./db.js");

function dataSungai(data){
    data.sungai_name = data.sungai_name;
    data.panjang_sungai = data.panjang_sungai;
}

const promiseQuery = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
}

const Sungai = {
    create: function(data) {
        data = dataSungai(data);
        let sql = 'INSERT INTO sungai SET ?';
        return promiseQuery(sql, data);
    },

    getAll: function() {
        let sql = "SELECT *, (SELECT IFNULL(COUNT(1),0) FROM das WHERE das.sungai_id = sungai.sungai_id) AS 'jml_das' FROM sungai";
        return promiseQuery(sql);
    },

    get: function(id) {
        let sql = `SELECT das.das_id, das.thumbnail, das.das_name, das.alamat, kecamatan.kecamatan, kps.kps_name, das.luas_das, das.deskripsi, das.latitude, das.longitude, (SELECT IFNULL(COUNT(1),0) FROM potensi_das WHERE potensi_das.das_id = das.das_id) AS 'jml_potensi' FROM das LEFT OUTER JOIN kps ON kps.das_id = das.das_id JOIN sungai ON das.sungai_id = sungai.sungai_id JOIN kecamatan ON kecamatan.kecamatan_id = das.kecamatan_id WHERE sungai.sungai_id = ?`;
        return promiseQuery(sql, [id]);
    },

    update: function(id, data) {
        data = dataSungai(data);
        let sql = "UPDATE sungai SET ? WHERE sungai_id = ?";
        return promiseQuery(sql, [data, id]);
    },

    delete: function(id) {
        let sql = "DELETE FROM sungai WHERE sungai_id = ?";
        return promiseQuery(sql, [id]);
    }
};

module.exports = { Sungai };