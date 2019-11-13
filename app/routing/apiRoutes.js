var friendsData = require("../data/friends.js");

module.exports = function(app) {
  
    app.get("/api/friends", function(req, res) {
      res.json(friendsData);
    });

    app.post("/api/friends", function(req, res) {
      //setting variables to find match
      var newFriendsScores = req.body.scores;
      var scoresArr = [];
      var bestMatch = 0;

      //loop through friends
      for(var i = 0; i < friendsData.length; i++){
        var scoresDiff = 0;
        console.log("friendsData", friendsData);
        
        //loop through friends scores
        for(var j = 0; j < newFriendsScores.length; j++){
          //compare each friends scores against the new friend
          scoresDiff += (Math.abs(parseInt(friendsData[i].scores[j]) - parseInt(newFriendsScores[j])));
        }
        
        scoresArr.push(scoresDiff);

      }
      
      //loop through scores to find best match in array
      for(var i = 0; i < scoresArr.length; i++){
        if(scoresArr[i] <= scoresArr[bestMatch]){
          bestMatch = i;
        }
      }
      console.log('bestMatch', bestMatch);

      //return bestMatch data
      var yourBestFriend = friendsData[bestMatch];
      res.json(yourBestFriend);
      
      //push new friend object to list of friends array
      friendsData.push(req.body);
      


    });
  }