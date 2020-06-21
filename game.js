var gamePattern= [];
var userClickPattern=[];
var buttonColors=["red","blue","green","yellow"];
var state=false;
var level=0;


$(document).keydown(function() {
if(state===false){
 newSequence();
 console.log(state);
 $("#level-title").html("Level "+level);
state=true;
}});



$(".btn").click(function(){
	var userChosenColor=$(this).attr("id");
	userClickPattern.push(userChosenColor);
	playSound(userChosenColor);
	animatePress(userChosenColor);
	checkAnswer(userClickPattern.length-1);
})

function newSequence(){

level++;
$("#level-title").html("Level "+level);
var randomNumber= Math.floor(Math.random()*4);
var randomChosenColor=buttonColors[randomNumber];
gamePattern.push(randomChosenColor);

$("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColor);


}

function playSound(name){
	var audio= new Audio("sounds/"+name+".mp3");
		audio.play();
}

function animatePress(currentColor){

$("#"+currentColor).addClass("pressed");
setTimeout(function(){
	$("#"+currentColor).removeClass("pressed")
},100);
}

function checkAnswer(currentLevel1){
  if(userClickPattern[userClickPattern.length-1]===gamePattern[userClickPattern.length-1]){
    if(userClickPattern[userClickPattern.length-1]===gamePattern[gamePattern.length-1]&&
    	userClickPattern.length===gamePattern.length){
    	console.log(userClickPattern);
    	console.log(gamePattern);
    	setTimeout(newSequence,1000);
    	userClickPattern=[];
    }
  }
  else{
  	$("#level-title").html("Game Over, Press Any Key to Restart");
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
    $("body").removeClass("game-over");
    },200);
    startOver();

  }
}

function startOver(){
	level=0;
	gamePattern=[];
	state=false;
	userClickPattern=[];
}


