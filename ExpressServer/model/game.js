//Name: Shafeeq Amirudeen
//Class: DISM/2B/24
//Admin No.: 2223007

const db = require('./databaseConfig');

var gameDB = {
    insertGame:function(game_image,game_title,game_description,year,callback){
        var dbConn = db.getConnection();

        dbConn.connect(function(err){
            if (err){
                return callback(err,null);
            }
            else{//success connection to database
                var sql=`INSERT INTO game(game_image, game_title, game_description, year) VALUES(?,?,?,?)`;
                dbConn.query(sql,[game_image,game_title,game_description,year],function(err,results){
                    dbConn.end();
                    return callback(err,results);
                });
            }
        });
    },
    insertPricesAndPlatformIDs: function(gameId, pairs, callback) {
        var dbConn = db.getConnection();
      
        dbConn.connect(function(err) {
            if (err) {
            return callback(err, null);
            } 
            else {
                var sql = "INSERT INTO game_platform (fk_game_id, fk_platform_id, price) VALUES ?";
                var values = pairs.map(pair => [gameId, pair.platformid, pair.price]);
      
                dbConn.query(sql, [values], function(err, results) {
                    dbConn.end();
                    return callback(err, results);
                }); 
            }
        });
    },

    insertGameCategories: function(gameId, categoryIds, callback) {
        var dbConn = db.getConnection();
      
        dbConn.connect(function(err) {
          if (err) {
            return callback(err, null);
          } else {
            var values = categoryIds.map(categoryId => [gameId, categoryId]);
            var sql = "INSERT INTO game_category (fk_gamecat_id, fk_catgame_id) VALUES ?";
            
            dbConn.query(sql, [values], function(err, result) {
              dbConn.end();
              if (err) {
                return callback(err, null);
              } else {
                return callback(null, result);
              }
            });
          }
        });
      },
      
    getAllGames:function(callback) {
        var dbConn = db.getConnection();

        dbConn.connect(function(err){

            if (err){
                return callback(err,null);
            }
            else{//success connection to database
                var sql="select gameid,game_title from game";

                dbConn.query(sql,[],function(err,results){
                    dbConn.end();
                    return callback(err,results);
                });
            }
        });
    },

    getGamesByPlatform: function(platform_name, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function(err){
            if(err){
                return callback(err,null);
            }
            else{
                var sql = `
                        SELECT
                        g.gameid,
                        g.game_image,
                        g.game_title,
                        g.game_description,
                        gp.price,
                        p.platform_name,
                        c.cat_id,
                        c.cat_name,
                        g.year,
                        g.created_at
                        FROM
                        game g
                        JOIN game_platform gp ON g.gameid = gp.fk_game_id
                        JOIN platform p ON gp.fk_platform_id = p.plat_id
                        JOIN game_category gc ON g.gameid = gc.fk_gamecat_id
                        JOIN category c ON gc.fk_catgame_id = c.cat_id
                        WHERE
                        p.platform_name = ? `;
                dbConn.query(sql,[platform_name], function(err,results){
                    dbConn.end();
                    return callback(err,results);
                });
            }
        });
    },

    getGamesByTitle: function(game_title, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function(err){
            if(err) {
                return callback(err,null);
            }
            else{
                var sql = `
                        SELECT
                        g.gameid,
                        g.game_image,
                        g.game_title,
                        g.game_description,
                        gp.price,
                        p.platform_name,
                        c.cat_id,
                        c.cat_name,
                        g.year,
                        g.created_at
                        FROM
                        game g
                        JOIN game_platform gp ON g.gameid = gp.fk_game_id
                        JOIN platform p ON gp.fk_platform_id = p.plat_id
                        JOIN game_category gc ON g.gameid = gc.fk_gamecat_id
                        JOIN category c ON gc.fk_catgame_id = c.cat_id
                        WHERE
                        g.game_title LIKE ? `;
                dbConn.query(sql,['%' + game_title + '%'], function(err,results){
                    dbConn.end();
                    return callback(err,results);
                });
            }
        });
    },

    deleteGame: function(gameId, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function(err) {
            if (err) {
            return callback(err);
            } 
            else {
                // Delete game and associated reviews with cascade delete
                var sql = 'DELETE FROM game WHERE gameid = ?';
                dbConn.query(sql, [gameId], function(err,results) {
                    dbConn.end();
                    return callback(err,results);
                });
            } 
        });
    },


    getGameById: function(gameId, callback) {
        var dbConn = db.getConnection();
      
        dbConn.connect(function(err) {
            
            if (err) {
                return callback(err, null);
            } 
            else {
                var sql = "SELECT * FROM game WHERE gameid = ?";
                dbConn.query(sql, [gameId], function(err, results) {
                    dbConn.end();
                    if (err) {
                        return callback(err, null);
                    } 
                    else {
                        if (results.length > 0) {
                            var game = results[0];
                            return callback(null, game);
                        } 
                        else {
                            return callback(null, null); // Game not found
                        }
                    }
                });
            }
        });
    },

    updateGame: function(game, callback) {
        var dbConn = db.getConnection();
      
        dbConn.connect(function(err) {

            if (err) {
                return callback(err, null);
            } 
            else {
                var sql = "UPDATE game SET game_title = ?, game_description = ?, year = ? WHERE gameid = ?";
                var params = [game.game_title, game.game_description, game.year, game.gameid];
        
                dbConn.query(sql, params, function(err, results) {
                    dbConn.end();
                    return callback(err, results);
                });
            }
        });
    },

    updatePricesAndPlatformIDs: function(gameId, pairs, callback) {
        var dbConn = db.getConnection();
      
        dbConn.connect(function(err) {
            if (err) {
                return callback(err, null);
            } 
            else {
                var sql = "UPDATE game_platform SET price = CASE fk_platform_id ";
                var params = [];
        
                for (var i = 0; i < pairs.length; i++) {
                sql += "WHEN ? THEN ? ";
                params.push(pairs[i].platformid, pairs[i].price);
                }
        
                sql += "END WHERE fk_game_id = ?";
        
                params.push(gameId);
        
                dbConn.query(sql, params, function(err, results) {
                    dbConn.end();
                    return callback(err, results);
                });
            }
        });
    },

    updateGameCategories: function(gameId, categoryIds, callback) {
        var dbConn = db.getConnection();
        
        dbConn.connect(function(err) {
            if (err) {
                return callback(err, null);
            } else {
                var sql = "DELETE FROM game_category WHERE fk_gamecat_id = ?";
                var params = [gameId];
        
                dbConn.query(sql, params, function(err, deleteResult) {
                    if (err) {
                        dbConn.end();
                        return callback(err, null);
                    } 
                    else {
                        var values = categoryIds.map(categoryId => [gameId, categoryId]);
                        var insertSql = "INSERT INTO game_category (fk_gamecat_id, fk_catgame_id) VALUES ?";
                        
                        dbConn.query(insertSql, [values], function(err, insertResult) {
                            dbConn.end();
                            if (err) {
                                return callback(err, null);
                            } 
                            else {
                                return callback(null, insertResult);
                            }
                        });
                    }
                });
            }
        });
    }

  
};


module.exports = gameDB;