//Name: Shafeeq Amirudeen
//Class: DISM/2B/24
//Admin No.: 2223007

const db = require('./databaseConfig');

var platformDB = {
    insertPlatform:function(platform_name,platform_description,callback){
        var dbConn = db.getConnection();

        dbConn.connect(function(err){

            if (err){
                return callback(err,null);
            }
            else{//success connection to database
                var sql="insert into platform(platform_name,platform_description) values(?,?)";
                dbConn.query(sql,[platform_name,platform_description],function(err,results){
                    dbConn.end();
                    return callback(err,results);
                });
            }
        });
    },

    getPlatform:function(callback){
        var dbConn = db.getConnection();

        dbConn.connect(function(err){

            if (err){
                return callback(err,null);
            }
            else{//success connection to database
                var sql="select * from platform";

                dbConn.query(sql,[],function(err,results){
                    dbConn.end();
                    return callback(err,results);
                });
            }
        });
    }
    
};

  