// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here
    applyFilter(reddify);
    applyFilterNoBackground(decreaseBlue);
    applyFilterNoBackground(increaseGreenByBlue);
    //applyFilter(decreaseBlue);
    //applyFilter(increaseGreenByBlue);



    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1 & 3: Create the applyFilter function here
//applyFilter updates each pixel color based on the filter that was called
function applyFilter(filterFunction) {
    for(var i = 0; i < image.length; i++) {
        //console.log(image[i]);
        for(var j = 0; j < image[i].length; j++) {
            
            var rgbString = image[i][j];
            rgbNumbers = rgbStringToArray(rgbString);
            //rgbNumbers[RED] = 255;
            filterFunction(rgbNumbers);
            rgbString = rgbArrayToString(rgbNumbers);
            image[i][j] = rgbString;
        }
    }
}

//updates the pixel color only for mario and not the background
function applyFilterNoBackground(filterFunction) {
    for(var i = 0; i < image.length; i++) {
        //console.log(image[i]);
        for(var j = 0; j < image[i].length; j++) {
            
            var backgroundRGB = image[0][0]
            if(backgroundRGB !== image[i][j]){
                var rgbString = image[i][j];
                rgbNumbers = rgbStringToArray(rgbString);
                //rgbNumbers[RED] = 255;
                filterFunction(rgbNumbers);
                rgbString = rgbArrayToString(rgbNumbers);
                image[i][j] = rgbString;
            }
        }
    }
}

//Makes the image more red
function reddify(array) {
    array[RED] = 255;
}

//Decreases the blue value in each pixel
function decreaseBlue(array) {
    array[BLUE] -= Math.max(0, array[BLUE] - 30);
}

function increaseGreenByBlue(array) {
    array[GREEN] = Math.min(255, array[GREEN] + array[BLUE] ) 
}

// TODO 5: Create the applyFilterNoBackground function


// TODO 2 & 4: Create filter functions




// CHALLENGE code goes below here
