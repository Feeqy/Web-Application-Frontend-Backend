//Name: Shafeeq Amirudeen
//Class: DISM/2B/24
//Admin No.: 2223007

const express=require(`express`);
const bodyParser=require(`body-parser`);

const user = require('../model/users');
const categoryDB = require('../model/category');
const platformDB = require('../model/platform');
const gameDB = require('../model/game');
const reviewDB = require('../model/review');
const app = express();
var cors = require('cors')
app.options('*',cors());
app.use(cors());
const path = require('path');
var verifyToken = require('../auth/verifyToken');



var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);//attach body-parser middleware
app.use(bodyParser.json());//parse json data

//---------------------------------------------------------------------------------Webservice endpoints---------------------------------------------------------------------------------//
// User Login
app.post('/users/login',function(req, res){
  var email=req.body.email;
  var password = req.body.password;

  user.loginUser(email, password, function(err, token, result){
      if(!err){
    res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      delete result[0]['password'];//clear the password in json data, do not send back to client
      console.log(result);
    res.json({success: true, UserData: JSON.stringify(result), token:token, status: 'You are successfully logged in!'}); 
    res.send();
  }
  else{
    if(err.statusCode === 401) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    else {
      res.status(500).json({ success: false, message: 'Internal server error' });
      }
    }
  }); 
});

app.post('/users/logout', function(req,res){
	console.log("Logging Out...");
	//res.clearCookie('session-id'); //clears the cookie in the response
	//res.setHeader('Content-Type', 'application/json');
  	res.json({success: true, status: 'Log out successful!'});

});

app.get('/users', function(req,res){
    // Retrieve users from the database
    user.getUser(function(err,results){
        if (err){//If there is error
            console.log(err);
            res.status(500);
            res.type('json');
            res.send(`{"Message": "Some error encountered!"}`);
        }
        else{//Success
            res.status(200);
            res.type('json');
            res.send(results);
        }
    });
});

app.get('/allGames', function(req,res){
  // Retrieve users from the database
  gameDB.getAllGames(function(err,results){
      if (err){//If there is error
          console.log(err);
          res.status(500);
          res.type('json');
          res.send(`{"Message": "Some error encountered!"}`);
      }
      else{//Success
          res.status(200);
          res.type('json');
          res.send(results);
      }
  });
});

app.get('/categories', function(req,res){
  categoryDB.getCategory(function(err,results){
    if(err){
      console.log(err);
      res.status(500);
      res.type('json');
      res.send(`{"Message" : "Some error encountered!"}`);
    }
    else{
      res.status(200);
      res.type('json');
      res.send(results);
    }
  });
});

app.get('/platforms', function(req,res){
  platformDB.getPlatform(function(err,results){
    if(err){
      console.log(err);
      res.status(500);
      res.type('json');
      res.send(`{"Message" : "Some error encountered!"}`);
    }
    else{
      res.status(200);
      res.type('json');
      res.send(results);
    }
  });
});

app.post('/users', function(req,res){
    //Retrieve user input
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var type = req.body.type;
    var profile_pic_url = req.body.profile_pic_url;

    // Insert user into the database
    user.insertUser(username,email,password,type,profile_pic_url,function(err,results){
        if (err){//Error
            if (err.code === 'ER_DUP_ENTRY'){
                res.status(422); // Unprocessable Entity
                res.type('json');
                res.send('{"Message": "The email provided already exists."}');
            }
            else{
               console.log(err);
                res.status(500);
                res.type('json');
                res.send(`{"Message": "Some error encountered!"}`); 
            }
        }
        else{//Success
            res.status(201);
            res.type('json');
            // res.send(results);
            res.send(`{"userid":"${results.insertId}"}`);
        }
    });
});

app.get('/users/:userid', function(req,res){
    var userid = req.params.userid;
    
    // Retrieve user by userid from the database
    user.getUserByUserid(userid,function(err,results){
        if (err){//Error
            console.log(err);
            res.status(500);
            res.type('json');
            res.send(`{"Message": "Some error encountered!"}`);
        }
        else{//Success
            res.status(200);
            res.type('json');
            res.send(results);
        }

    });

});


app.post('/category', function(req,res){
    //retrieve category input
    var cat_name = req.body.cat_name;
    var cat_description = req.body.cat_description;

    // Insert category into the database
    categoryDB.insertCategory(cat_name,cat_description,function(err,results){
        if (err){//Error
            if (err.code === 'ER_DUP_ENTRY'){
                res.status(422); // Unprocessable Entity
                res.type('json');
                res.send('{"Message": "The category provided already exists."}');
            }
            else{
               console.log(err);
                res.status(500);
                res.type('json');
                res.send(`{"Message": "Some error encountered!"}`); 
            }
        }
        else{//Success
            res.status(201);
            res.type('json');
            res.send(results);
        }
    });
});

app.post('/platform', function(req,res){

  // Retrieve platform input
  var platform_name = req.body.platform_name;
  var platform_description = req.body.platform_description;

  // Insert platform into the database
  platformDB.insertPlatform(platform_name,platform_description,function(err,results){
    if (err){//Error
        if (err.code === 'ER_DUP_ENTRY'){
            res.status(422); // Unprocessable Entity
            res.type('json');
            res.send('{"Message": "The platform provided already exists."}');
        }
        else{
            console.log(err);
            res.status(500);
            res.type('json');
            res.send(`{"Message": "Some error encountered!"}`); 
        }
    }
    else{//Success
        res.status(201);
        res.type('json');
        res.send(results);
    }
  });
});

app.post('/game', function(req, res) {
  // Retrieve game input
  var game_image = req.body.game_image;
  var game_title = req.body.game_title;
  var game_description = req.body.game_description;
  var platformids = req.body.plat_id.split(',').map(Number); // Convert to array of integers
  var prices = req.body.price.split(',').map(parseFloat); // Convert to array of floats
  var categoryIds = req.body.cat_id.split(',').map(Number); // Convert to array of integers
  var year = req.body.year;

  // Insert game into the database
  gameDB.insertGame(game_image, game_title, game_description, year, function(err, gameResult) {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(422); // Unprocessable Entity
        res.type('json');
        res.send('{"Message": "The game provided already exists."}');
      } else {
        console.log(err);
        res.status(500);
        res.type('json');
        res.send('{"Message": "Some error encountered! Cannot insert game"}');
      }
    } else {
      const gameId = gameResult.insertId;

      // Prepare price and platformid pairs
      var pairs = [];
      for (var i = 0; i < platformids.length; i++) {
        var pair = {
          platformid: platformids[i],
          price: prices[i]
        };
        pairs.push(pair);
      }

      // Insert prices and platformIDs into the database
      gameDB.insertPricesAndPlatformIDs(gameId, pairs, function(err, result) {
        if (err) {
          console.log(err);
          res.status(500);
          res.type('json');
          res.send('{"Message": "Some error encountered! Cannot insert Price and PlatformID"}');
        } else {
          // Insert category IDs into game_category table
          gameDB.insertGameCategories(gameId, categoryIds, function(err, categoryResult) {
            if (err) {
              console.log(err);
              res.status(500);
              res.type('json');
              res.send('{"Message": "Some error encountered! Cannot insert Categories"}');
            } else {
              res.status(201);
              res.type('json');
              res.send(`{"gameid": "${gameId}"}`);
            }
          });
        }
      });
    }
  });
});

  

app.get('/game/:platform', function(req,res){
  var platform = req.params.platform;

  // Retrieve games by platform from the database
  gameDB.getGamesByPlatform(platform, function(err,results){
    if (err){
        console.log(err);
        res.status(500).json({message: 'Error retrieving game/games by platform.'});
    }
    else{
      res.status(200);
      res.type('json');
      res.send(results);
    }
  })
});

app.get('/game/title/:title', function(req,res){
  var title = req.params.title;

  gameDB.getGamesByTitle(title, function(err,results){
    if (err){
      console.log(err);
      res.status(500).json({message: 'Error retrieving game/games by title.'});
    }
    else{
      res.status(200);
      res.type('json');
      res.send(results);
    }
  });
});


app.delete('/game/:id', function(req, res) {
    var gameId = req.params.id;

    // Delete game by id from the database
    gameDB.deleteGame(gameId, function(err,results) {
        if (err) {
            console.log(err);
            res.status(500);
            res.type('json');
            res.send(`{"Message": "Error deleting game."}`)
        } 
         else {
            res.status(204).json({message: 'Game deleted successfully.'});
        }
    });
});
  
// 9) Endpoint: PUT /game/:id
app.put('/game/:id', function(req, res) {
  var gameId = req.params.id;
  var game_title = req.body.game_title;
  var game_description = req.body.game_description;
  var platformids = req.body.platformid.split(',').map(Number);
  var prices = req.body.price.split(',').map(parseFloat);
  var categoryIds = req.body.categoryid.split(',').map(Number);
  var year = req.body.year;

  // Fetch the existing game details from the database
  gameDB.getGameById(gameId, function(err, game) {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error retrieving game.' });
    }

    if (!game) {
      return res.status(404).json({ message: 'Game not found.' });
    }

    // Update the game details
    game.game_title = game_title;
    game.game_description = game_description;
    game.year = year;

    // Update the game in the database
    gameDB.updateGame(game, function(err, updateResult) {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error updating game.' });
      }

      // Update the Platform IDs and Prices in the game_platform table
      var pairs = [];
      for (var i = 0; i < platformids.length; i++) {
        pairs.push({
          platformid: platformids[i],
          price: prices[i]
        });
      }

      gameDB.updatePricesAndPlatformIDs(gameId, pairs, function(err, updatePlatformResult) {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: 'Error updating platform IDs and prices.' });
        }

        // Update the category associations in the game_category table
        gameDB.updateGameCategories(gameId, categoryIds, function(err, updateCategoryResult) {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error updating category associations.' });
          }

          return res.sendStatus(204); // Success response
        });
      });
    });
  });
});

  
// 10) Endpoint: POST /user/:uid/game/:gid/review/
app.post('/users/:uid/game/:gid/review/', verifyToken, function(req, res) {

  var userid= req.params.uid;
  var gameid = req.params.gid;
  var content = req.body.review_content;
  var rating = req.body.review_rating;

  // Call the addReview function
  reviewDB.addReview(userid, gameid, content, rating, function(err, reviewId) {

    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error adding review.' });
    }

    return res.status(201).json({ reviewid: reviewId });
  });
});
  
// 11) Endpoint: GET /game/:id/review
app.get('/game/:id/review', function(req, res) {
  var gameId = req.params.id;

  // Call the getGameReviews function
  reviewDB.getGameReviews(gameId, function(err, reviews) {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error retrieving game reviews.' });
    }
    return res.status(200).json(reviews);
  });
});



module.exports = app;