//variables

var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;


//functions

//Utility functions

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//Game Logic functions

function nextSequence() {

  userClickedPattern = []; // Clear previous user input for the new level

  level++ // increase level
  $("h1").text("Level " + level); //update h1 text

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100); // flash animation for the random colour
  playSound(randomChosenColour); //corresponding sound for the random colour
}



function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success")

    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong")
    playSound("wrong") // play sound wrong
    $("body").addClass("game-over") // add game over css class to body
    setTimeout(function (){ //set timeout for game over class (later) 200 ms
      $("body").removeClass("game-over") //remove game over class after timeout
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart"); //update h1 game over
    startOver()
  }
  console.log("User clicked pattern:", userClickedPattern);
  console.log("Game pattern:", gamePattern);
}

function startOver () {
  level = 0;
  gamePattern = [];
  started = false;
}

//Event listeners and their inline event-handler functions

$(".btn").click(function handler() {
  //code that runs when button clicked
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});


$(document).keypress(function () {
  // code that runs on key press
  if (!started) {
    nextSequence();
    started = true;
  }
});
