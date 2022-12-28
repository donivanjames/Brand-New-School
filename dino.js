import {
  getCustomProperty,
  setCustomProperty,
  incrementCustomProperty,
} from "./updateCustomProperty.js";

const player = document.querySelector("[data-dino]");
const world = document.querySelector('[data-world]');
const JUMP_SPEED = 0.35;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2; // amount of animation frames
const FRAME_TIME = 160; // how long each animation frame should last (in milliseconds)

// PLAYER SETUP
let isJumping;
let dinoFrame;
let currentFrameTime;
let yVelocity;
export function setupDino() {
  isJumping = false; // Reset all past values
  dinoFrame = 0;
  currentFrameTime = 0;
  yVelocity = 0;
  setCustomProperty(player, "--bottom", 25);
  document.removeEventListener("keydown", onJump); // this removes any extra eventListeners from the game before we add a new one
  document.removeEventListener("mousedown", onJump); // this removes any extra eventListeners from the game before we add a new one
  document.addEventListener("keydown", onJump); // this adds a listener to the player that waits for any key press, then it executes the onJump function
  document.addEventListener("mousedown", onJump); // this adds a listener to the player that waits for click, then it executes the onJump function
}

// UPDATE PLAYER
export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
}


let boundaryBox
export function getDinoRect() {

  if(boundaryBox) boundaryBox.remove()

  const dinoRect = player.getBoundingClientRect();

  dinoRect.width = dinoRect.width * 0.70;
  dinoRect.height = dinoRect.height * 0.60;

  boundaryBox = document.createElement('div');
  boundaryBox.style = "border: 2px solid red; position: absolute;";
  boundaryBox.style.left = dinoRect.left + 'px';
  boundaryBox.style.top = dinoRect.top + 'px';
  boundaryBox.style.width = dinoRect.width + 'px';
  boundaryBox.style.height = dinoRect.height + 'px';

  document.body.appendChild(boundaryBox);

  return dinoRect
}



// SET LOSING SPRITE
export function setDinoLose() {
    // set the sprite of the player do the loss image
    player.src = "imgs/dino-lose.png"
}

// HANDLE RUN
function handleRun(delta, speedScale) {
  if (isJumping) {
    // if isJumping: set animation to stationary
    player.src = `imgs/dino-stationary.png`;
    return;
  }

  if (currentFrameTime >= FRAME_TIME) {
    // swaps animation frames when currentFrameTime is above frameTime
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT; // will cycle animation frames no matter how many there are
    player.src = `imgs/dino-run-${dinoFrame}.png`; // picks an image from the current dino frame
    currentFrameTime -= FRAME_TIME; // reset currentFrameTime back to 0
  }

  currentFrameTime += delta * speedScale; // animation will play faster as the level speeds up
}

// HANDLE JUMP
function handleJump(delta) {
  if (!isJumping) return; // if not jumping then exit out

  incrementCustomProperty(player, "--bottom", yVelocity * delta); // jump/increment into the air based on yVelocity

  if (getCustomProperty(player, "--bottom") <= 25) {
    // if dino is back on the ground: continue running
    setCustomProperty(player, "--bottom", 25); // make sure dino position is zero
    isJumping = false;
  }

  yVelocity -= GRAVITY * delta; // jump velovity slows down and goes negative while in the air to pull player back to ground
}

function onJump(event) {
  if (event.code != "Space" && event.button !== 0 || isJumping) return; // if the key pressed is not space or the player is jumping then dont do anything

  yVelocity = JUMP_SPEED;
  isJumping = true;
}
