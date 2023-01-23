const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");
require("dotenv").config();

// const connection = mysql.createConnection({
//     host: dbConfig.HOST,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     database: dbConfig.DB
// });

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
});

connection.connect(error => {
    if (error) throw error;
    console.log("Berhasil Konek ke DB");
});

module.exports = connection;