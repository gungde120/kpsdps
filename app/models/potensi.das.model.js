const db = require("./db.js");
var multer  = require('multer');
const path = require('path');

function dataPotensiDas(data, file){
    data.potensi_id = data.potensi_id;
    data.das_id = data.das_id;
    data.potensi_das_name = data.potensi_das_name;
    data.deskripsi = data.deskripsi;
    if(file) data.thumbnail = file.filename;
    return data;
}

const storage = multer.diskStorage({
    destination : path.join(__dirname + './../public/images/potensi/'),
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

const PotensiDas = {
    create: function(data, file) {
        data = dataPotensiDas(data, file);
        let sql = 'INSERT INTO potensi_das SET ?';
        return promiseQuery(sql, data);
    },


    getAll: function() {
        let sql = "SELECT potensi_das.id, potensi_das.thumbnail, potensi_das.potensi_das_name, potensi.potensi_name, potensi_das.deskripsi FROM potensi_das JOIN potensi on potensi.potensi_id = potensi_das.potensi_id ";
        return promiseQuery(sql);
    },

    get: function(id) {
        let sql = `SELECT potensi_das.id, potensi_das.thumbnail, potensi_das.potensi_das_name, potensi.potensi_name, potensi_das.deskripsi FROM potensi_das JOIN potensi on potensi.potensi_id = potensi_das.potensi_id WHERE potensi_das.das_id = ?`;
        return promiseQuery(sql, [id]);
    },

    update: function(id, data, file) {
        data = dataPotensiDas(data, file);
        let sql = "UPDATE potensi_das SET ? WHERE id = ?";
        return promiseQuery(sql, [data, id]);
    },

    delete: function(id) {
        let sql = "DELETE FROM potensi_das WHERE id = ?";
        return promiseQuery(sql, [id]);
    }
};

module.exports = { PotensiDas, upload };