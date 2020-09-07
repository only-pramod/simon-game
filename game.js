var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"];

var started = false;
var level=0;
// check for click to start the game
$(document).keypress(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;}
});

// check the user click
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  animatePress(userChosenColour);
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});
// to check pressed key is matched or not

function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
    console.log("yes");
    if(userClickedPattern.length==gamePattern.length){
    setTimeout(function(){
      nextSequence();},1000);
  }

  }else{
    console.log("no");
    new Audio ("sounds/wrong.mp3").play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
startOver();

  }

}

// next task

function nextSequence(){
  userClickedPattern=[];//once user entered whole sequence
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);


}


function playSound(name){
  new Audio ("sounds/"+name+".mp3").play();
}
function animatePress(currentColour){
$("."+currentColour).addClass("pressed");
setTimeout(function(){
  $("."+currentColour).removeClass("pressed")},100);
}
// restart the game
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
