//Name: Shafeeq Amirudeen
//Class: DISM/2B/24
//Admin No.: 2223007

var mysql = require('mysql');
var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "PasswordStrength=weak",
            database: "spgames"
        });
        return conn;
    }
};
module.exports = dbconnect;