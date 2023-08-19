var ButtonColours = ["red", "blue", "green", "yellow"];
var GamePattern = [];
var UserClickedPattern = [];
var started = false;
var level = 0;

function startGame() {
    if (!started) {
        $("#level-title").text("Nivel " + level);
        NextSequence();
        started = true;
    }
}

$(document).keypress(function(event) {
    startGame();
});

$("body").click(function() {
    startGame();
});

$(".btn").click(function() {
    var UserChosenColour = $(this).attr("id");
    UserClickedPattern.push(UserChosenColour);
    PlaySounds(UserChosenColour);
    AnimatePress(UserChosenColour);
    // console.log(UserClickedPattern);
    CheckAnswer(UserClickedPattern.length-1);

});

function CheckAnswer(CurrentLevel){
    if(GamePattern[CurrentLevel]==UserClickedPattern[CurrentLevel]){
        console.log("Success");

        if(UserClickedPattern.length == GamePattern.length){
            setTimeout(function() {
                NextSequence();
            }, 1000);
        }
    }else{
        console.log("Wrong");
        PlaySounds("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Ha perdido, presione una letra para comenzar de nuevo");

        StartOver();
    }


}

function NextSequence(){
   UserClickedPattern = [];
   level++;
   $("#level-title").text("Nivel " + level);
   var RandomNumber = Math.floor(Math.random() * 4);
   var RandomChosenColour = ButtonColours[RandomNumber];
   GamePattern.push(RandomChosenColour);
   $("#" + RandomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   PlaySounds(RandomChosenColour);
};

function PlaySounds(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();    
};    

function AnimatePress(CurrentColour){
    $("#" + CurrentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + CurrentColour).removeClass("pressed")
    },100)
};

function StartOver(){
    level=0;
    GamePattern = [];
    started = false;
}