// 3. pada bagian paling atas file js tambahkan array
const buttonColours = ["red", "blue", "green", "yellow"];

// 4. buat array kosong yang nantinya akan digunakan untuk menyimpan data dari var randomchosencolour
var gamePattern = [];

// array untuk menampun warna yang kita klik
var userClickedPattern = [];

//menggunakan jquery untuk mendeteksi tombol mana yang diklik kemudian menjalankan handlerfunction
$('.btn').click(function() {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

var started = false;

var level = 0;

$(document).keypress(function(){
    if (!started) {
        $("#level-title").text('level ' + level)
        nextSequence()
        started = true;
    }
})

// 1. membuat fungsi dengan nama nextSequence
function nextSequence() {
    userClickedPattern = [];

    level++

    $('#level-title').text('level ' + level)

    // 2. didalam fungsi tambahkan variable randomNumber
    var randomNumber = Math.floor(Math.random() * 4);
    
    // 5. didalam fungsi tambahkan variable untuk memilih warna secara random menggunakan var randomnumber pada array buttoncolours
    var randomChosenColour = buttonColours[randomNumber]; 

    // 6. kemudian masukan data dari var randomchosencolour ke dalam array gamepattern 
    gamePattern.push(randomChosenColour);
    
    for (i = 0; i < gamePattern.length; i++) {
        delay(i);
    }
   

}

function playSound(name){
  //play audio sesuai dengan warnanya 
  var audio = new Audio ('sounds/' + name +'.mp3');
  audio.play();
}

function animatePress(currentColour){
    $('#' + currentColour).addClass('pressed');

    setTimeout (function(){
    $('#' + currentColour).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('success')
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    } else {
        var wrongAudio = new Audio ('sounds/wrong.mp3');
        wrongAudio.play();
        $('body').addClass('game-over');

        setTimeout (function(){
            $('body').removeClass('game-over');
        }, 100);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver()
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function delay(i) {
    setTimeout(function() {
        $('#' + gamePattern[i]).fadeOut(100).fadeIn(100);
        playSound(gamePattern[i]);
    }, i * 1000);
  }