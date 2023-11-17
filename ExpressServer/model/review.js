//Name: Shafeeq Amirudeen
//Class: DISM/2B/24
//Admin No.: 2223007

const db = require('./databaseConfig');

var reviewDB = {
  addReview: function(userid, gameid, review_content, review_rating, callback) {
    var dbConn = db.getConnection();
  
    dbConn.connect(function(err) {
        if (err) {
            return callback(err, null);
        } 
        else {
            var sql = "INSERT INTO review (review_userid, review_gameid, review_content, review_rating) VALUES (?, ?, ?, ?)";
            var values = [userid, gameid, review_content, review_rating];
    
            dbConn.query(sql, values, function(err, result) {
                dbConn.end();
                if (err) {
                    return callback(err, null);
                } 
                else {
                    var reviewId = result.insertId;
                    return callback(null, reviewId);
                }
            });
        }
    });
  },

  getGameReviews: function(gameId, callback) {
    var dbConn = db.getConnection();
  
    dbConn.connect(function(err) {
      if (err) {
        return callback(err, null);
      } 
      else {
        var sql = `SELECT r.review_gameid AS gameid, r.review_content AS content, r.review_rating AS rating, u.username AS username, r.created_at AS created_at
                FROM review r
                JOIN users u ON r.review_userid = u.userid
                WHERE r.review_gameid = ?`;
        var values = [gameId];
  
        dbConn.query(sql, values, function(err, results) {
          dbConn.end();
          if (err) {
            return callback(err, null);
          } else {
            return callback(null, results);
          }
        });
      }
    });
  }
      
};

module.exports = reviewDB;