const sql = require("./db.js");

const Counter = function(counter) {
    this.jml_das = counter.jml_das;
    this.jml_kps = counter.jml_kps;
    this.jml_potensi = counter.jml_potensi;
    this.jml_potensi_das = counter.jml_potensi_das;
};

// Get All
Counter.getAll = (result) => {
    let query = "SELECT (SELECT IFNULL(COUNT(1),0) FROM das) AS jml_das, (SELECT IFNULL(COUNT(1),0) FROM kps) AS jml_kps, (SELECT IFNULL(COUNT(1),0) FROM potensi) AS jml_potensi, (SELECT IFNULL(COUNT(1),0) FROM potensi_das) AS jml_potensi_das";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        var data = JSON.parse(JSON.stringify(res));
        console.log(res);
        result(null, res);
    });
};

module.exports = Counter;