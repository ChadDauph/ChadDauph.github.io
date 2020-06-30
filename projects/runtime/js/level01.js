var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "car", "x": 400, "y": 450 },
                { "type": "car", "x": 600, "y": 450 },
                { "type": "car", "x": 900, "y": 450 },
,
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
        function createReward(x,y){
        var coins = game.createGameItem('coins',25);
        var blueSquare =  draw.bitmap('img/coins.png');
        blueSquare.scaleX = .1;
        blueSquare.scaleY = .1;
        blueSquare.x = -25;
        blueSquare.y = -25;
        coins.addChild(blueSquare);
        coins.x = x;
        coins.y = y;
        game.addGameItem(coins);
        
        coins.velocityX = -1;

        
        coins.onPlayerCollision = function(){

            coins.fadeOut();
        };
        }        
        
        createReward(900, groundY - 20);
        
        
        function createEnemy(x,y){
        var enemy = game.createGameItem('enemy',25);
        var redSquare =  draw.bitmap('img/person.png');
        redSquare.scaleX = .1;
        redSquare.scaleY = .1;
        redSquare.x = -25;
        redSquare.y = -25;
        enemy.addChild(redSquare);
        enemy.x = x;
        enemy.y = y;
        game.addGameItem(enemy);
        
        enemy.velocityX = -1;

        
        enemy.onPlayerCollision = function(){
            console.log('The enemy has hit Halle');
            game.changeIntegrity(-10);
            enemy.fadeOut();
        };
        enemy.onProjectileCollision = function(){
            enemy.shrink();
        };
        };
        
        

        
        
        createReward(900, groundY - 20);  
        createEnemy(1000,groundY-20);
        createEnemy(800,groundY-20);
        
        
        function createCar(x,y){
        var hitZoneSize = 25;
        var damageFromObstable = 20;
        var carHitZone = game.createObstacle(hitZoneSize, damageFromObstable); 
        carHitZone.x = x;
        carHitZone.y = y;
        game.addGameItem(carHitZone);
        var obstacleImage = draw.bitmap('img/car.png');

        obstacleImage.scaleX = .02;
        obstacleImage.scaleY = .02;
        carHitZone.addChild(obstacleImage);
        obstacleImage.x = -25;
        obstacleImage.y = -25;   
        }
        for(var i = 0; i < levelData.gameItems.length; i++){
            var firstGameItemObject = levelData.gameItems[i];
            createCar(firstGameItemObject.x, firstGameItemObject.y);

            
        }
        

        
        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
