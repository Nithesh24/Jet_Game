const obstacle1 = document.getElementById("obstacle1")
const obstacle2 = document.getElementById("obstacle2")
const obstacle3 = document.getElementById("obstacle3")
const obstacle4 = document.getElementById("obstacle4")
const obstacle5 = document.getElementById("obstacle5")
const obstacles = [obstacle1, obstacle2, obstacle3, obstacle4, obstacle5]
const plane = document.getElementById("plane")
const gameOver_Screen = document.getElementById("gameOver_Screen")
const music = document.getElementById("music")
const blast_effect = document.getElementById("blast_effect")
blast_effect.loop = false
const highScore = document.getElementById("highScore")
const user = window.prompt("Please Enter your name")

for (var i = 0; i < 5; i ++){
    obstacles[i].style.bottom = Math.floor(Math.random() * 500).toString() + "px"
}
obstacle1.style.bottom = "-100px" // so that first two won't collide with the plane
obstacle2.style.bottom = "-100px"

var velocity = -5
var gravity = -3
var plane_thrust = 10
var jump_state =  false
var game_over = false
var score = 0

function thrust(){ //onlcick function
    jump_state = true 
}

//collision detector
function checkCollision(obstacle, plane){
    let o_left = parseFloat(window.getComputedStyle(obstacle).getPropertyValue("Left"))
    let o_bottom = parseFloat(window.getComputedStyle(obstacle).getPropertyValue("Bottom"))
    let p_left = parseFloat(window.getComputedStyle(plane).getPropertyValue("Left"))
    let p_bottom = parseFloat(window.getComputedStyle(plane).getPropertyValue("Bottom"))
    
    if (p_bottom > o_bottom && p_bottom < o_bottom + 50){
        if (p_left + 50 > o_left && p_left < o_left + 100){
            gameOver()
        }
    }
    //checking plane is out of boundry
    if (p_bottom < 0 || p_bottom + 40 > 600){
        gameOver()
    }

}

//Game Over 
function gameOver (){
    velocity = 0;
    gravity = 0;
    plane_thrust = 0;
    game_over = true;
    plane.style.backgroundImage = "url(assets/blast.png)"
    gameOver_Screen.style.display = "flex"
    music.pause()

    blast_effect.play()
}

//retry system
function retry(){
    gameOver_Screen.style.display = "none"
    velocity = -5
    gravity = -3
    plane_thrust = 10
    jump_state =  false
    game_over = false
    score = 0;
    plane.style.backgroundImage = "url(assets/plane.png)"
    music.currentTime = 0
    music.play()

    for (var i = 0; i < 5; i ++){
        obstacles[i].style.bottom = Math.floor(Math.random() * 500).toString() + "px"
        obstacles[i].style.left = (100 + (i)*200).toString() + "px"
    }
    obstacle1.style.bottom = "-100px" 
    obstacle2.style.bottom = "-100px"
    plane.style.bottom = "300px";
}

//going back to main menu
function mainMenu(){
    window.location.replace("../index.html")
}

//game frames
setInterval(function (){
    //obstacles movement
    for (var i = 0; i < 5; i ++){
        let left = window.getComputedStyle(obstacles[i]).getPropertyValue("left")
        obstacles[i].style.left = (parseFloat(left) +  velocity).toString() + "px"

        if (parseFloat(left) + 100 < 0){
            obstacles[i].style.left = "1000px"
            obstacles[i].style.bottom = Math.floor(Math.random() * 500).toString() + "px"
        }
    }

    //plane movement mechanics
    if (jump_state === true){
        gravity = plane_thrust
        jump_state = false
    }
    if (gravity > -3 && game_over !== true){
        if (gravity > 5){ //plane tilt effect
            plane.style.transform = "rotate(-20deg)"
        }else{
            plane.style.transform = "rotate(0deg)"
        }
        gravity -= 1
    }
    var plane_bottom = window.getComputedStyle(plane).getPropertyValue("bottom")
    plane.style.bottom = (parseFloat(plane_bottom) + gravity).toString() + "px"

    //checking collision
    for (var i = 0; i<5; i++){
        checkCollision(obstacles[i], plane)
    }

    //increasing game speed
    if (game_over !== true){
        velocity -= 0.005
        gravity -= 0.005

    }

    //increading score
    score += -1*velocity/100
    highScore.innerText = (parseInt(score)).toString()

}, 16)
