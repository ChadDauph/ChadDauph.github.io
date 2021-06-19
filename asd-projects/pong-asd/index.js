/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  //rollX and rollY generate a random ball direction, when the game starts.
  var rollX = rollDice(5);
  var rollY = rollDice(5);
  //Assining Keys id's to key pair values, so they are no longer magic numbers
  var KEY = {
    DOWN: 40,
    UP: 38,
    W: 87,
    S: 83,
  };
  
  // Game Item Objects

/*Player Objects(Paddles) stored as variables*/
  var player1 = gameItem("#player1");

  var player2 = gameItem("#player2");

/*Ball Object stored as variable*/
  var ball = gameItem("#ball");

/*Board Object stored as variable*/
  var board = gameItem("#board");

/*Player1 and Player2 score variables*/
  var score1 = 0;
  
  var score2 = 0;

  changeBoxText("#box1",score1);

  changeBoxText("#box2",score2);


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handlekeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handlekeyUp);



  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();

    //Checks if either player score is 11 and ends the game(Ball Stops Moving)
    if(score1 == 11 || score2 == 11){
      rollX = 0;
      rollY = 0;
      ball.positionX = 440;
      ball.positionY = 220;
    }

  }


  
  /* 
  Called in response to events.
  */
 //This event is called when a player pressed a button and it updates the speed of the paddle to allow it to move
  function handlekeyDown(event) {
    console.log(event.which)
    
    if(event.which === KEY.S)   {
      player1.speedY = 5;
      console.log("down pressed");
    }
    if(event.which === KEY.W)  {
      player1.speedY = -5;
      console.log("up pressed");
    }
    if(event.which === KEY.UP)   {
      player2.speedY = -5;
      console.log("down pressed");
    }
    if(event.which === KEY.DOWN)  {
      player2.speedY = 5;
      console.log("up pressed");
    }

  }
//This event is called when a player releases a button and it stops the paddle when key is released
  function handlekeyUp(event)  {
    console.log(event.which)
    if(event.which === KEY.S)  {
      player1.speedY = 0;
      console.log("down released")
    }
    if(event.which === KEY.W)  {
      player1.speedY = 0;
      console.log("up released")
    }
    if(event.which === KEY.UP)   {
      player2.speedY = 0;
      console.log("down pressed");
    }
    if(event.which === KEY.DOWN)  {
      player2.speedY = 0;
      console.log("up pressed");
    }

  }



  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  //Used to help update the text of the score boxes
  function changeBoxText(box, newText)  {
    $(box).text(newText);
  }



  function repositionGameItem()  {
    // Updates the X and Y position of the Box based on the value of a random speed from 1 - 5. Adds speed value to the X and Y position to make it move.
    player1.positionX += player1.speedX;
    player1.positionY += player1.speedY;
    player2.positionX += player2.speedX;
    player2.positionY += player2.speedY;
    ball.positionX += rollX;
    ball.positionY += rollY;
    if(objectCollide(player1,board)){
      player1.positionY += -player1.speedY;
    }
    if(objectCollide(player2,board)){
      player2.positionY += -player2.speedY;
    }
    if(objectCollide(ball,board)){
      rollY = -rollY;
    }
    if(scoreCollide(ball,board)){
      ball.positionX = 440;
      ball.positionY = 220;
    }
    if(paddleCollisions(ball,player1))  {
      rollX = -rollX;
    }
    if(paddleCollisions(ball,player2))  {
      rollX = -rollX;
    }
  }



  function redrawGameItem()  {
    // Draws the gameItem(Box) in it's X and Y position every time it is called. 
    $("#player1").css("left", player1.positionX)
    $("#player1").css("top", player1.positionY)
    $("#player2").css("right", player2.positionX)
    $("#player2").css("top", player2.positionY)
    $("#ball").css("left", ball.positionX)
    $("#ball").css("top", ball.positionY)
  }

  //Factory function to create came objects
  function gameItem($id){
    return {
      id: $id,
      positionX: parseFloat($($id).css('left')),
      positionY: parseFloat($($id).css('top')),
      width: $($id).width(),
      height: $($id).height(),
      speedX: 0,
      speedY: 0,
    };
  }

  //Generates a random #for the ball to move at random angles on game start
  function rollDice(sides) {	
    return Math.ceil(Math.random() * sides);	
  }


  //Detects collisions for top and bottom walls
  function objectCollide(object1, object2)  {
    object1.topY = object1.positionY;
    object1.bottomY = object1.positionY + object1.height;
    object2.bottomY = object2.positionY + object2.height;
    object2.topY = object2.positionY;
    if(object1.bottomY > object2.bottomY)  {
      console.log(true);
      return true;
    }
    if(object1.topY < object2.topY)  {
      console.log(true);
      return true;
      
    }
    else  {
      return false;
    }
  }

  //Detects collisions for left and right walls and updates the score
  function scoreCollide(obj1, obj2)  {
    
    obj1.leftX = obj1.positionX;
    obj1.rightX = obj1.positionX + obj1.width;
    obj2.leftX = obj2.positionX;
    obj2.rightX = obj2.positionX + obj2.width;
    if(obj1.leftX < obj2.leftX)  {
      console.log(true);
      score2 += 1;
      changeBoxText("#box2",score2);
      console.log(score2);
      rollX = rollDice(5);
      rollY = rollDice(5);
      return true;
    }
    else if(obj1.rightX > obj2.rightX)  {
      console.log(true);
      score1 += 1;
      changeBoxText("#box1",score1);
      console.log(score1);
      rollX = rollDice(5);
      rollY = rollDice(5);
      return true;
    }
    else  {
      return false;
    }
  }

  //Detects collisions for the paddles
  function paddleCollisions (obj1, obj2)  {
    obj1.leftX = obj1.positionX;
    obj1.rightX = obj1.positionX + obj1.width;
    obj2.leftX = obj2.positionX;
    obj2.rightX = obj2.positionX + obj2.width;
    obj1.topY = obj1.positionY;
    obj1.bottomY = obj1.positionY + obj1.height;
    obj2.bottomY = obj2.positionY + obj2.height;
    obj2.topY = obj2.positionY;
    if((obj2.leftX <= obj1.rightX) && (obj2.rightX >= obj1.leftX) && (obj2.bottomY >= obj1.topY) && (obj2.topY <= obj1.bottomY))  {
      console.log(true);
      return true;
    }
    else if((obj2.leftX <= obj1.rightX) && (obj2.rightX >= obj1.leftX) && (obj2.bottomY >= obj1.topY) && (obj2.topY <= obj1.bottomY))  {
      console.log(true);
      return true;
    }
    else{
      return false;
    }

  }
  
}
