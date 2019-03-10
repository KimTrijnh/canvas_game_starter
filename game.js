let canvas;
let ctx;
let bgReady, zoombieReady, plantReady, fixedReady, boomReady;
let bgImage, zoombieImage, plantImage, fixedImage, boomImage;
let plantsUrl = ["/images/plant.png", "/images/plant-1.png",
  "/images/plant-2.png", "/images/plant-3.png"
];
let startBtn = document.getElementById("start");
let info = document.getElementById("info");
let lifeCount = document.getElementById("life");
let bgMusic = document.getElementById("bg-music");
let walkMusic = document.getElementById("walk-sound");
function playAudio(a) {
  a.play();
}
function pauseAudio(a) {
  a.pause();
}
let myTimer;
let count = 0;
let t = 0;
let score = [];
let life = 3;


canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 429;
document.body.appendChild(canvas);

//generate random number from 0 to x-1
function random(x) {
  return Math.floor(Math.random() * x)
}

//Timing & Counting
let startTime;
let eslaped = 0;
let timeUpdate = function () {
  eslaped = Math.floor((Date.now() - startTime) / 1000);
};

//To start: press start btn or press enter
function start() {
  clearInterval(timeUpdate);
  startTime = Date.now();
  setInterval(timeUpdate, 1000);
  count = 0;
  life = 3;
  resetSpeed();
  lifeCount.innerText = `Life left: ${life}`;
  setupKeyboardListeners();
}

let enterPress = function (key) {
  // press Enter to start
  if (key.keyCode == 13) {
    start();
  }
}

startBtn.addEventListener('click', start); //press start btn to start
addEventListener("keydown", enterPress, false); //press enter to start

function countAndShow() {
  //count times a plant has caught
  if (count < 10) {
    count++;
  }
  if (count === 10) {
    stopMoving();
    score.push(eslaped);
    var best = Math.min(...score);
    lifeCount.innerText = `YOU WIN!!!`;
    info.innerText = `recent score: ${eslaped} s
    Your best:  ${best} s `;
    clearInterval(timeUpdate); //????: WHY DOESN'T WORK
    stopKeyboarListeners();
  }

}


/** 
 * Keyboard Listeners & Stop keyboard listener
 */

let keysDown = {};

let handleKeyUp = function (key) {
  delete keysDown[key.keyCode];
  //stop moving sound
  
};

let handleKeyDown = function (key) {
  keysDown[key.keyCode] = true;
};

function setupKeyboardListeners() {
  addEventListener("keydown", handleKeyDown, false);

  addEventListener("keyup", handleKeyUp, false);
  foo = true;
}

function stopKeyboarListeners() {
  removeEventListener("keydown", handleKeyDown, false);
  removeEventListener("keyup", handleKeyUp, false);
  keysDown = {};
}

/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the plant has been caught!
 */
let update = function () {
  if (38 in keysDown) { // Player is holding up key
    zoombieY -= 5;
    
    
  }
  if (40 in keysDown) { // Player is holding down key
    zoombieY += 5;
    
  }
  if (37 in keysDown) { // Player is holding left key
    zoombieX -= 5;
  }
  if (39 in keysDown) { // Player is holding right key
    zoombieX += 5;
    
  }
  // check if zoombie out of canvas
  if (zoombieX < 0) {
    zoombieX = 0;
  }
  if (zoombieX > canvas.width - zoombieImage.width) {
    zoombieX = canvas.width - zoombieImage.width;
  }
  if (zoombieY < 0) {
    zoombieY = 0;
  }
  if (zoombieY > canvas.height - zoombieImage.height) {
    zoombieY = canvas.height - zoombieImage.height;
  }

  //check if zoombie run into obtables



  if ( // Check if player and plant collided.
    zoombieX <= (plantX + plantImage.width) &&
    plantX <= (zoombieX + plantImage.width) &&
    zoombieY <= (plantY + plantImage.height) &&
    plantY <= (zoombieY + plantImage.height)
  ) {
    // Pick a new location for the plant.
    let i = random(4);
    plantImage.src = plantsUrl[i];
    plantX = random(canvas.width - plantImage.width);
    plantY = random(canvas.height - plantImage.height);
    countAndShow();
  }

};

//****load imgages***/
function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/bg-zombie.png";

  fixedImage = new Image();
  fixedImage.onload = function () {
    //show fixed zoombies
    fixedReady = true;
  }
  fixedImage.src = "images/fixed-4.png";

  zoombieImage = new Image();
  zoombieImage.onload = function () {
    // show the hero image
    zoombieReady = true;
  };
  zoombieImage.src = "images/zoombie-1.png";

  plantImage = new Image();
  plantImage.onload = function () {
    // show the plant image
    plantReady = true;
  };
  plantImage.src = "images/plant.png";

  boomImage = new Image();
  boomImage.onload = function () {
    boomReady = true;
     };
  boomImage.src = "/images/boom.png" ;

}

/** 
 * Setting up our characters.
 */

let zoombieX = canvas.width / 2;
let zoombieY = canvas.height / 2;


let plantX = 200;
let plantY = 100;

let f1_X = 300;
let f1_Y = 330;
let f2_X = 410;
let f2_Y = 130;

let boomX = random(1000);
let boomY = random(429);
let vx =0;
let vy=0;
function resetSpeed() {
vx = 8;
vy = 6;
}
function stopMoving(){
  vx = 0;
  vy = 0;
}

function boomMoving() {
  boomX += vx;
  boomY += vy;
  if (boomY + vy > canvas.height ||
    boomY + vy < 0) {
    vy = -vy;
  }
  if (boomX + vx > canvas.width ||
    boomX + vx < 0) {
    vx = -vx;
  }
  if (
    zoombieX <= (boomX + 50) &&
    boomX <= (zoombieX + 50) &&
    zoombieY <= (boomY + 50) &&
    boomY <= (zoombieY + 50)
  ) {
    if (life > 0) {
      boomX = random(canvas.width - 50);
      boomY = random(canvas.height - 50);
      life --;
      lifeCount.innerText = `Life left: ${life}`;
    }
    if (life === 0) {
      lifeCount.innerText = `You LOSE`;
      clearInterval(timeUpdate);   //????: WHY DOESN'T WORK
      stopKeyboarListeners();
      stopMoving();
    }

}
}

/**
 * This function, render, runs as often as possible.
 */
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (fixedReady) {
    ctx.drawImage(fixedImage, f1_X, f1_Y);
    ctx.drawImage(fixedImage, f2_X, f2_Y);
  }
  if (zoombieReady) {
    ctx.drawImage(zoombieImage, zoombieX, zoombieY);
  }
  if (plantReady) {
    ctx.drawImage(plantImage, plantX, plantY);
  }
  if (boomReady) {
    ctx.drawImage(boomImage, boomX, boomY);
    boomMoving();
  }

  //render time - count on canvas  
  ctx.font = "24px ZCOOL QingKe HuangYou";
  ctx.fillStyle = "red";
  ctx.fillText(`${eslaped}s . Plant: ${count} `, 840, 400);
};

/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and plant)
 * render (based on the state of our game, draw the right things)
 */

var main = function () {
  update();
  render();
  
  // Request to do this again ASAP. This is a special method
  // for web browsers. 
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
main();