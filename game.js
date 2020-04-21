var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStatus = false;
var level = 0;

$(document).on('keypress', function(e){
    if(gameStatus != true){
        nextSequence();
        gameStatus = true;
        $("#level-title").text("Level " + level);
    }
    
});


function nextSequence(){
    userClickedPattern = [];
    randomNumber = Math.floor(Math.random() * 4);
    

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);


    var idToAnimate = "#" + randomChosenColour;
    var soundToPlay = "sounds/" + randomChosenColour + ".mp3";


    $(idToAnimate).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio(soundToPlay);
    audio.play();
    level++;
    $("#level-title").text("Level " + level);

}

function handler(){
    alert("Hi");
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    var soundToPlay = "sounds/" + userChosenColour + ".mp3";
    playSound(soundToPlay)
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

function playSound(name){
    
    var audio = new Audio(name);
    audio.play();
}

function animatePress(currentColour){
    var first = $("#" + currentColour).addClass("pressed")
    setTimeout(function(){
        first.removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
            
        }
    }else{
        console.log("Wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Prss Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    gameStatus = false;
}