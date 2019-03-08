/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/

let canvas;
let ctx;
let result = document.getElementById("count");
let timer = document.getElementById("timer");
let startBtn = document.getElementById("start"); //do more: add shortcut to start by keyboard, or only press first key.
let resetBtn = document.getElementById("reset");
let count = 0;


//time counting
let time = 0;

function timeUpdate() {
  time++;
  timer.innerText = `${time} s`;
}

function timerStart() {
  setInterval(timeUpdate, 1000)
}


function random() {
  //generate random number
  let random;
  return (random = Math.floor(Math.random() * 500));
}


function countAndShow() {
  //count times a monster has caught
  count++;
  result.innerText = `${count}`;
  return count;
}


canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

let bgReady, heroReady, monsterReady;
let bgImage, heroImage, monsterImage;

function loadImages() {
  bgImage = new Image();
  bgImage.onload = function() {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/background.png";
  heroImage = new Image();
  heroImage.onload = function() {
    // show the hero image
    heroReady = true;
  };
  heroImage.src = "images/hero.png";

  monsterImage = new Image();
  monsterImage.onload = function() {
    // show the monster image
    monsterReady = true;
  };
  monsterImage.src = "images/monster.png";
}

/**
 * Setting up our characters.
 */

let heroX = canvas.width / 2;
let heroY = canvas.height / 2;

let monsterX = 100;
let monsterY = 100;

/**
 * Keyboard Listeners
 * You can safely ignore this part, for now.
 *
 * This is just to let JavaScript know when the user has pressed a key.
 */
let keysDown = {};

function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here.
  addEventListener(
    "keydown",
    function(key) {
      keysDown[key.keyCode] = true;
    },
    false
  );

  addEventListener(
    "keyup",
    function(key) {
      delete keysDown[key.keyCode];
    },
    false
  );
}

/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the monster has been caught!
 *
 *  If you change the value of 5, the player will move at a different rate.
 */
let update = function() {
  if (38 in keysDown) {
    // Player is holding up key

    heroY -= 5;
  }
  if (40 in keysDown) {
    // Player is holding down key

    heroY += 5;
  }
  if (37 in keysDown) {
    // Player is holding left key
    heroX -= 5;
  }
  if (39 in keysDown) {
    // Player is holding right key
    heroX += 5;
  }

  // Check if player and monster collided. Our images
  // are about 32 pixels big.
  if (
    heroX <= monsterX + 32 &&
    monsterX <= heroX + 32 &&
    heroY <= monsterY + 32 &&
    monsterY <= heroY + 32
  ) {
    // Pick a new location for the monster.
    // Note: Change this to place the monster at a new, random location.

    random();
    monsterX = monsterX + 50;
    monsterY = monsterY + 70;
    countAndShow();
  }
};

/**
 * This function, render, runs as often as possible.
 */
var render = function() {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, heroX, heroY);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImage, monsterX, monsterY);
  }
};

/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */
var main = function() {
  update();
  render();
  // Request to do this again ASAP. This is a special method
  // for web browsers.
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;

// Let's play this game!
startBtn.addEventListener("click", timerStart);
loadImages();
setupKeyboardListeners();
main();











/*
result = document.createElement("div");
result.id = "result";
result.style.backgroundColor = "red";
result.style.display ="inline-block";
result.style.width = "250px";
result.style.height = "250px";
document.body.appendChild(result);
*/
