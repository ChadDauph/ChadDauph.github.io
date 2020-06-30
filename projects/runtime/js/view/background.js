var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var lamp;
        var buildings = [];
     
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.bitmap('img/sky.jpg');
            backgroundFill.x = 0;
            backgroundFill.y =-120;
            backgroundFill.scaleX = 20
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield

            var sun = draw.bitmap('img/sun.png');
            sun.x = -75;
            sun.y = -75;
            sun.scaleX = 0.5;
            sun.scaleY = 0.5;
            background.addChild(sun);
            

            
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for(var i=0;i<3;++i) {
                var buildingHeight = 300;
                var building = draw.bitmap('img/Building.png');
                building.scaleX = .3;
                building.scaleY = .3;
                building.x = 200*i*2;
                building.y = 205;
                background.addChild(building);
                buildings.push(building);
            }
            
            
            // TODO 4: Part 1 - Add a tree
            lamp = draw.bitmap('img/lamp.png');
            lamp.x = 0;
            lamp.y = 243;
            lamp.scaleX = .1;
            lamp.scaleY = .1;
            background.addChild(lamp);
            
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            if(lamp.x < -200) {
                lamp.x = canvasWidth;
            }
            lamp.x = lamp.x - 1;
            
            
            // TODO 5: Part 2 - Parallax
            for(var b = 0; b < buildings.length; b++){
                var eachBuilding = buildings[b];
                if(eachBuilding.x < -200){
                    eachBuilding.x = canvasWidth;
                }
                eachBuilding.x = eachBuilding.x - 0.2;
            }


        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
