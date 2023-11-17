//Name: Shafeeq Amirudeen
//Class: DISM/2B/24
//Admin No.: 2223007

const db = require('./databaseConfig');

var categoryDB = {
    insertCategory:function(cat_name,cat_description,callback){
        var dbConn = db.getConnection();

        dbConn.connect(function(err){

            if (err){
                return callback(err,null);
            }
            else{//success connection to database
                var sql="insert into category(cat_name,cat_description) values(?,?)";
                dbConn.query(sql,[cat_name,cat_description],function(err,results){
                    dbConn.end();
                    return callback(err,results);
                });
            }
        });
    },

    getCategory:function(callback){
        var dbConn = db.getConnection();

        dbConn.connect(function(err){

            if (err){
                return callback(err,null);
            }
            else{//success connection to database
                var sql="select * from category";

                dbConn.query(sql,[],function(err,results){
                    dbConn.end();
                    return callback(err,results);
                });
            }
        });
    }
    
};

module.exports = categoryDB;