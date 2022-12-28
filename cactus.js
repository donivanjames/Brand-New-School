import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.05; // needs to be the same speed as the ground, might consolodate them both into a "groundSpeed" variable
const CACTUS_INTERVAL_MIN = 500;
const CACTUS_INTERVAL_MAX = 2000; // speed of obstacles appearing in milliseconds
const worldElem = document.querySelector("[data-world]"); // grabs the world element so we can add the obstacles into the world

// SETUP OBSTACLE
let nextCactusTime;
export function setupCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN; // the first obstacle will spawn with the minimum time to get the game going
  document.querySelectorAll("[data-cactus]").forEach((cactus) => {
    cactus.remove(); // remove any old cactus in the scene when the game restarts
  });
}

// UPDATE OBSTACLE
export function updateCactus(delta, speedScale) {
  document.querySelectorAll("[data-cactus]").forEach((cactus) => {
    incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1);
    if (getCustomProperty(cactus, "--left") <= -100) {
      cactus.remove();
    }
  });

  if (nextCactusTime <= 0) {
    // when obstacle time reaches zero: summon a new obstacle
    createCactus();
    nextCactusTime =
      randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) /
      speedScale; // divide by speedscale so obstacles speed up over time
  }
  nextCactusTime -= delta; // count down to next cactus
}

// GET ALL OBSTACLE BOUNDARIES
let boundaryBox = []
export function getCactusRects() {

  document.querySelectorAll("div.tempBox").forEach(boundary => boundary.remove())

  // gives us all of the rectangles for all of the obstacles on the screen
  const obMap = [...document.querySelectorAll("[data-cactus]")].map((cactus) => {

    const obRect = cactus.getBoundingClientRect();
    let tempBox = document.createElement('div');


    // obRect.width = obRect.width * 0.5;
    // obRect.height = obRect.height * 0.60;

    tempBox.className = "tempBox"
    tempBox.style = "border: 2px solid red; position: absolute;";
    tempBox.style.left = obRect.left + 'px';
    tempBox.style.top = obRect.top + 'px';
    tempBox.style.width = obRect.width + 'px';
    tempBox.style.height = obRect.height + 'px';

    boundaryBox.push(tempBox)
  
    return obRect
  });


  boundaryBox.forEach(obstacle => document.body.appendChild(obstacle));
  boundaryBox = []

  return obMap
}


/*
if(boundaryBox) boundaryBox.remove()

  const dinoRect = player.getBoundingClientRect();

  boundaryBox = document.createElement('div');
  boundaryBox.style = "border: 2px solid red; position: absolute;";
  boundaryBox.style.left = dinoRect.left + 'px';
  boundaryBox.style.top = dinoRect.top + 'px';
  boundaryBox.style.width = dinoRect.width + 'px';
  boundaryBox.style.height = dinoRect.height + 'px';

  document.body.appendChild(boundaryBox);
*/

// CREATE CACTUS
function createCactus() {
  const cactus = document.createElement("img"); // this creates a new image on the page that will become an obstacle
  cactus.dataset.cactus = true; // adds "data-cactus" to obstacle object so we can interact with it
  cactus.src = "imgs/cactus.png"; // selects the correct image from files
  cactus.classList.add("cactus"); // adds CSS styles to obstacle
  setCustomProperty(cactus, "--left", 100); // sets our obstacle position 100% left, which puts it all the way on the right side of the screen
  setCustomProperty(cactus, "--top", 0); 
  worldElem.append(cactus); // this adds our obstacle to the world
}

// RANDOM NUMBER GENERATOR
function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
