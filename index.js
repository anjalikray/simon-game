var buttonsColours = ["red", "blue", "green", "yellow"];
var gamePattern = [] ;
var userClickedPattern = [];
var started = false;
var level = 0;

$("#start-game").click(function(){

    if(!started){

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr('id');
    
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        
        if(userClickedPattern.length === gamePattern.length){
             setTimeout(function(){
                nextSequence();
             }, 1000);
        }
    }
    else{
        audio = new Audio("sounds/" + "wrong.mp3");
        audio.play();

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over")
        } , 400);

        $("#level-title").text("Game Over, Click Button to Restart");

        startOver();

    }
}

function nextSequence() {
    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randonNumber = Math.floor((Math.random() * 4));
    var randomChosenColour = buttonsColours[randonNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}


function playSound(name) {
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


