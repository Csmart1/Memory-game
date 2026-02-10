var bgMusic = new Audio("sounds/background.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.3;

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence(){
  userClickedPattern = [];

  document.getElementById("level-title").textContent = "Level " + level;

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  playSound(randomChosenColor);

  document.getElementById(randomChosenColor).classList.add("flash");
  setTimeout(function(){
    document.getElementById(randomChosenColor).classList.remove("flash");
  }, 200);
}

var startButton = document.getElementById("start-btn")
startButton.addEventListener("click", function (){
  if (!started){
    level = 1;
    started = true;
    startButton.style.display = "none";

    setTimeout(function(){
      nextSequence();
    }, 600);
  }
  bgMusic.currentTime = 0;
  bgMusic.play();
});


var button = document.querySelectorAll(".btn");

button.forEach(function(button){
  button.addEventListener("click", function (){
    var userchosenColor = this.id;
    userClickedPattern.push(userchosenColor);
    this.classList.add("flash");
    setTimeout(() => this.classList.remove("flash"), 200);

    playSound(userchosenColor);
    animatePress(userchosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
});

function checkAnswer(currentLevel){

  if (userClickedPattern[currentLevel]=== gamePattern[currentLevel]){

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        level++;
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver(){
  document.body.classList.add("game-over");
  setTimeout(function(){
    document.body.classList.remove("game-over");
  }, 200);

  document.getElementById("level-title").textContent = "Game Over";

  level = 0;
  gamePattern = [];
  started = false;

  playSound("wrong");

  bgMusic.pause();
  bgMusic.currentTime = 0;

  startButton.style.display = "inline-block";
  startButton.textContent = "Restart"
}

function animatePress(color) {
  var button = document.getElementById(color);
  button.classList.add("pressed");

  setTimeout(function(){
    button.classList.remove("pressed");
  }, 100);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}