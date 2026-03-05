/*
  FNAF-inspired Sprig game
  Controls:
  - i: toggle camera monitor
  - w/s: cycle camera feed up/down (while monitor is up)
  - a: toggle left door
  - d: toggle right door
  - j: flash left light
  - l: flash right light
*/

const floor = ".";
const desk = "t";
const leftDoorOpen = "o";
const leftDoorClosed = "c";
const rightDoorOpen = "u";
const rightDoorClosed = "v";
const leftLightOff = "x";
const leftLightOn = "y";
const rightLightOff = "m";
const rightLightOn = "n";
const monitorOff = "q";
const monitorOn = "r";

setLegend(
  [floor, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [desk, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [leftDoorOpen, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [leftDoorClosed, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [rightDoorOpen, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [rightDoorClosed, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [leftLightOff, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [leftLightOn, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [rightLightOff, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [rightLightOn, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [monitorOff, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [monitorOn, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
);

const office = map`
ox......um
..........
..........
..........
...tttt...
..........
..........
..........
q........q
..........
`;

setMap(office);
setBackground(floor);

const cams = [
  "SHOW STAGE",
  "DINING",
  "WEST HALL",
  "EAST HALL",
  "PIRATE COVE",
  "KITCHEN"
];

const NIGHT_DURATION = 180; // seconds
const TICK_MS = 1000;

let gameOver = false;
let win = false;

let monitorUp = false;
let leftDoorShut = false;
let rightDoorShut = false;
let leftLightTimer = 0;
let rightLightTimer = 0;
let cameraIndex = 0;

let power = 100;
let elapsed = 0;
let hour = 12;

const bots = {
  bonnie: { ai: 6, side: "left", progress: 0, atDoorTicks: 0 },
  chica: { ai: 5, side: "right", progress: 0, atDoorTicks: 0 },
  freddy: { ai: 2, side: "right", progress: 0, atDoorTicks: 0 },
  foxy: { ai: 4, stage: 0, sprintReady: false }
};

const moveSfx = tune`
120: c5~120,
3720`;

const jumpscareSfx = tune`
120: c4^120 + d4^120 + f4^120,
120: g4^120 + a4^120 + c5^120`;

function usageLevel() {
  let u = 1;
  if (monitorUp) u += 1;
  if (leftDoorShut) u += 1;
  if (rightDoorShut) u += 1;
  if (leftLightTimer > 0) u += 1;
  if (rightLightTimer > 0) u += 1;
  return u;
}

function doorSprite(typeOpen, typeClosed, x, y, shut) {
  clearTile(x, y);
  addSprite(x, y, shut ? typeClosed : typeOpen);
}

function lightSprite(typeOff, typeOn, x, y, on) {
  clearTile(x, y);
  addSprite(x, y, on ? typeOn : typeOff);
}

function monitorSprite(on) {
  clearTile(0, 8);
  addSprite(0, 8, on ? monitorOn : monitorOff);
}

function maybeMove(bot, maxProgress) {
  const roll = Math.floor(Math.random() * 20) + 1;
  if (roll <= bot.ai && bot.progress < maxProgress) {
    bot.progress += 1;
    playTune(moveSfx);
  }
}

function lose(reason) {
  gameOver = true;
  clearText();
  addText("JUMPSCARE!", { x: 4, y: 6, color: color`3` });
  addText(reason, { x: 1, y: 8, color: color`2` });
  addText("R: retry", { x: 6, y: 11, color: color`6` });
  playTune(jumpscareSfx);
}

function checkDoorKill(bot, side) {
  if (gameOver || win) return;
  const shut = side === "left" ? leftDoorShut : rightDoorShut;
  if (!shut) {
    bot.atDoorTicks += 1;
    if (bot.atDoorTicks >= 2) {
      lose(side === "left" ? "BONNIE GOT IN" : "CHICA/FREDDY GOT IN");
    }
  } else {
    bot.atDoorTicks = 0;
  }
}

function updateBots() {
  if (gameOver || win) return;

  maybeMove(bots.bonnie, 3);
  maybeMove(bots.chica, 3);
  if (elapsed > 40) maybeMove(bots.freddy, 4);

  const watchingFoxy = monitorUp && cams[cameraIndex] === "PIRATE COVE";
  if (!watchingFoxy) {
    const roll = Math.floor(Math.random() * 20) + 1;
    if (roll <= bots.foxy.ai && bots.foxy.stage < 3) bots.foxy.stage += 1;
  }

  if (bots.bonnie.progress >= 3) checkDoorKill(bots.bonnie, "left");
  if (bots.chica.progress >= 3) checkDoorKill(bots.chica, "right");
  if (bots.freddy.progress >= 4) checkDoorKill(bots.freddy, "right");

  if (bots.foxy.stage >= 3) {
    if (!rightDoorShut) {
      lose("FOXY SPRINTED");
    } else {
      power = Math.max(0, power - 6);
      bots.foxy.stage = 1;
    }
  }
}

function updateDifficulty() {
  if (elapsed === 45) {
    bots.bonnie.ai = 8;
    bots.chica.ai = 7;
    bots.foxy.ai = 6;
  }
  if (elapsed === 90) {
    bots.bonnie.ai = 10;
    bots.chica.ai = 10;
    bots.freddy.ai = 7;
    bots.foxy.ai = 9;
  }
  if (elapsed === 135) {
    bots.bonnie.ai = 12;
    bots.chica.ai = 12;
    bots.freddy.ai = 10;
    bots.foxy.ai = 12;
  }
}

function updateHUD() {
  clearText();
  addText(`PWR ${Math.floor(power)}% U${usageLevel()}`, { x: 0, y: 0, color: color`2` });
  addText(`${hour} AM`, { x: 15, y: 0, color: color`6` });

  if (monitorUp) {
    addText(`CAM:${cams[cameraIndex]}`, { x: 0, y: 2, color: color`4` });
    addText(`B${bots.bonnie.progress} C${bots.chica.progress} F${bots.freddy.progress} X${bots.foxy.stage}`, { x: 0, y: 3, color: color`3` });
  } else {
    if (leftLightTimer > 0 && bots.bonnie.progress >= 3) addText("BONNIE!", { x: 0, y: 5, color: color`3` });
    if (rightLightTimer > 0 && (bots.chica.progress >= 3 || bots.freddy.progress >= 4)) addText("RIGHT SIDE!", { x: 10, y: 5, color: color`3` });
  }
}

function redrawControls() {
  doorSprite(leftDoorOpen, leftDoorClosed, 0, 0, leftDoorShut);
  doorSprite(rightDoorOpen, rightDoorClosed, 8, 0, rightDoorShut);
  lightSprite(leftLightOff, leftLightOn, 1, 0, leftLightTimer > 0);
  lightSprite(rightLightOff, rightLightOn, 7, 0, rightLightTimer > 0);
  monitorSprite(monitorUp);
}

function tick() {
  if (gameOver || win) return;

  elapsed += 1;
  const usage = usageLevel();
  power -= 0.12 * usage;

  if (leftLightTimer > 0) leftLightTimer -= 1;
  if (rightLightTimer > 0) rightLightTimer -= 1;

  if (power <= 0) {
    power = 0;
    leftDoorShut = false;
    rightDoorShut = false;
    monitorUp = false;
    redrawControls();
    lose("POWER OUT");
    return;
  }

  updateDifficulty();
  updateBots();

  const progress = elapsed / NIGHT_DURATION;
  const targetHour = 12 + Math.floor(progress * 6);
  hour = targetHour >= 13 ? targetHour - 12 : targetHour;

  if (elapsed >= NIGHT_DURATION) {
    win = true;
    clearText();
    addText("6 AM", { x: 9, y: 6, color: color`4` });
    addText("YOU SURVIVED", { x: 3, y: 8, color: color`2` });
    addText("R: retry", { x: 6, y: 10, color: color`6` });
    return;
  }

  redrawControls();
  updateHUD();
}

function resetGame() {
  gameOver = false;
  win = false;
  monitorUp = false;
  leftDoorShut = false;
  rightDoorShut = false;
  leftLightTimer = 0;
  rightLightTimer = 0;
  cameraIndex = 0;
  power = 100;
  elapsed = 0;
  hour = 12;

  bots.bonnie.ai = 6;
  bots.bonnie.progress = 0;
  bots.bonnie.atDoorTicks = 0;

  bots.chica.ai = 5;
  bots.chica.progress = 0;
  bots.chica.atDoorTicks = 0;

  bots.freddy.ai = 2;
  bots.freddy.progress = 0;
  bots.freddy.atDoorTicks = 0;

  bots.foxy.ai = 4;
  bots.foxy.stage = 0;

  setMap(office);
  redrawControls();
  updateHUD();
}

onInput("i", () => {
  if (gameOver || win) return;
  monitorUp = !monitorUp;
  redrawControls();
  updateHUD();
});

onInput("w", () => {
  if (!monitorUp || gameOver || win) return;
  cameraIndex = (cameraIndex - 1 + cams.length) % cams.length;
  updateHUD();
});

onInput("s", () => {
  if (!monitorUp || gameOver || win) return;
  cameraIndex = (cameraIndex + 1) % cams.length;
  updateHUD();
});

onInput("a", () => {
  if (gameOver || win || power <= 0) return;
  leftDoorShut = !leftDoorShut;
  redrawControls();
  updateHUD();
});

onInput("d", () => {
  if (gameOver || win || power <= 0) return;
  rightDoorShut = !rightDoorShut;
  redrawControls();
  updateHUD();
});

onInput("j", () => {
  if (gameOver || win || power <= 0) return;
  leftLightTimer = 2;
  redrawControls();
  updateHUD();
});

onInput("l", () => {
  if (gameOver || win || power <= 0) return;
  rightLightTimer = 2;
  redrawControls();
  updateHUD();
});

onInput("k", () => {
  if (!gameOver && !win) return;
  resetGame();
});

setInterval(tick, TICK_MS);
resetGame();
