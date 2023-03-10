// TITLE SONG

let titleSong = new Audio("sounds/Music/title-song.wav");
titleSong.volume = 0.3;
titleSong.loop = true;

export function playTitleSong() {
  titleSong.play();
}

export function stopTitleSong() {
  titleSong.pause();
  titleSong.currentTime = 0;
}

// RUN SONG

let runSong = new Audio("sounds/Music/run-song.wav");
runSong.volume = 0.1;
runSong.loop = true;

export function playRunSong() {
  runSong.play();
}

export function stopRunSong() {
  runSong.pause();
  runSong.currentTime = 0;
}

// PLAYER JUMP

let jumpSoundAudio = new Audio("sounds/Jump.mp3")

export function jumpSound() {
    jumpSoundAudio.play()
}

// PLAYER LOSE

let loseSoundAudio = new Audio("sounds/Game-Lose-2.mp3")

export function loseSound() {
    loseSoundAudio.play()
}

// APPLE COLLECT

let collectSoundAudio = new Audio("sounds/Coin-Collect.mp3")
collectSoundAudio.volume = 0.1

export function collectSound() {
    collectSoundAudio.play()
}