var gamePattern = [ ];
var userClickedPattern = [ ];
var buttonColours =["red", "blue", "green", "yellow"];
var level = 0;

var started = false;
$(document).keypress(function(){
  if (!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});

function nextSequence(){
  userClickedPattern = [ ];
  level++
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 3+1);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var audio = new Audio ("sounds/"+ name +".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");

  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
}, 100);
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

    if (gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }else{
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart.");

    startover();
  }
  }

function startover(){
  level =0;
  gamePattern =[ ];
  started = false;
}
