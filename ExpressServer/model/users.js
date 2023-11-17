//Name: Shafeeq Amirudeen
//Class: DISM/2B/24
//Admin No.: 2223007

const db = require('./databaseConfig');
var config = require('../config.js');
var jwt = require('jsonwebtoken');

var userDB = {
    loginUser: function (email, password, callback) {

		var conn = db.getConnection();

		conn.connect(function (err) {
			if (err) {
				console.log(err);
				return callback(err, null);
			}
			else {
				console.log("Connected!");

				var sql = 'select * from users where email=? and password=?';

				conn.query(sql, [email, password], function (err, result) {
					conn.end();

					if (err) {
						console.log("Err: " + err);
						return callback(err, null, null);
					} else {
						var token = "";
						var i;
						if (result.length == 1) {

							token = jwt.sign({ id: result[0].userid, type: result[0].type }, config.key, {expiresIn: 86400});
							console.log("@@token " + token);
							return callback(null, token, result);


						} else {
							var err2 = new Error("UserID/Password does not match.");
							err2.statusCode = 401;
							return callback(err2, null, null);
						}
					}
				});
			}
		});
	},
    // For Endpoint: GET /users
    getUser:function(callback){
        var dbConn = db.getConnection();

        dbConn.connect(function(err){

            if (err){
                return callback(err,null);
            }
            else{//success connection to database
                var sql="select * from users";

                dbConn.query(sql,[],function(err,results){
                    dbConn.end();
                    return callback(err,results);
                });
            }
        });
    },

    insertUser:function(username,email,password,type,profile_pic_url,callback){
        var dbConn = db.getConnection();

        dbConn.connect(function(err){

            if (err){
                return callback(err,null);
            }
            else{//success connection to database
                var sql="insert into users(username,email,password,type,profile_pic_url) values(?,?,?,?,?)";
                dbConn.query(sql,[username,email,password,type,profile_pic_url],function(err,results){
                    dbConn.end();
                    return callback(err,results);
                });
            }
        }); 
    },

    getUserByUserid:function(userid,callback){
        var dbConn = db.getConnection();

        dbConn.connect(function(err){

            if (err){
                return callback(err,null);
            }
            else{//success connection to database
                var sql="select * from users where userid=?";
                dbConn.query(sql,[userid],function(err,results){
                    dbConn.end();
                    return callback(err,results);
                });
            }
        });
    }
}

module.exports = userDB;