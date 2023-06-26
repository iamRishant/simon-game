
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];

//this below code detect keypress and change the h1
var started=false;
var level=0;
$(document).keypress(function(event){
    if(!started){ 
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
});
// ****************************************************************

var userClickedPattern=[];//isme store krege user kya click krr rha hai
$('.btn').click(handler);
function handler(){
    var userChosenColour=$(this).attr('id');
    userClickedPattern.push(userChosenColour);
    makeSound(userChosenColour);// when we click mouse button it will make the corresponding sound
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);//passing last index of the user answer
}



function nextSequence() {
    userClickedPattern=[];//user har baar pattern bnaega to array ko har level ke baad reinitialise krna hoga
    level++;
    $("#level-title").text("Level " + level);



    var randomNumber=Math.floor(Math.random()*4);// it will generate a random number

    var randomChosenColour=buttonColours[randomNumber];//it will choose the random color

    gamePattern.push(randomChosenColour);//it will store the random sequence

    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);//it will create an animation

    makeSound(randomChosenColour);
    
    
}
// this function will make sound accordingly when new sequence is generate or button is cilked
function makeSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
// **************************************************************

// this below code will animate the button when pressed
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");//it will add the class

    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed");//after 100 mili second it will remove the class
    }, 100);
}
// ***************************************************************

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){//
        console.log("success");
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        var audio= new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");//ye text ko change krke start over ko call krrdega
        startOver();
    }
}

function startOver(){//start over function sara value reset krr dega and jaise hi koi key click krege to line 8 prr chala jaega control
    level=0;
    started=false;
    gamePattern=[];
}

