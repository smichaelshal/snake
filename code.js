//Global Vars

//Board
var sizeBoard = 600;
var sizeBlock = 20;
var numBlock = sizeBoard / sizeBlock

//Colors
var colorSnake = "#FFB997";
var colorBoard = "#900C3F";
var colorHead = "#FF5733" ;
var colorApple = "#FFD166";

//Snake
var arraySnake = [];//[3, 0, 0], [2, 0, 0], [1, 0, 0],

for (var i = 1; i > 0; i--) {
  arraySnake.push([i, 0, 0])
}


var lastDirection = 0;
var queueActs = [];

// Points
var points = 0;
var arrApple = [];
var strPoints = "Points: "

//times
var timeApple = 2000;
var timeSnake = 100;
var isloss = false;

//other
var tempObj;


//Functions
function init() {
  createBoard();

  setInterval(moves, timeSnake);
  setInterval(createApples, timeApple);

  //move();

}

function createBoard() {
  document.getElementById("main").innerHTML += "<div id='board'></div>";
  creatBlocks()
}

function creatBlocks() {
  for (var i = 0; i < numBlock; i++){
    for (var j = 0; j < numBlock; j++){
      document.getElementById("board").innerHTML += "<div id='block" + j + "_" + i + "' class='square'></div>";
    }
  }
}
function paintBlock(x, y){
  var idBlock = 'block' + x + '_' + y

  try {
  document.getElementById(idBlock).style.background = colorSnake;
}
catch(error) {
  errorPlay()
}

}

function paintHead(x, y){
  var idBlock = 'block' + x + '_' + y;
  document.getElementById(idBlock).style.background = colorHead;
  }


function clearBlock(x, y){
  var idBlock = 'block' + x + '_' + y
  document.getElementById(idBlock).style.background = colorBoard;
}

function move(){
  var tempX = -1;
  var tempY = -1;
  var tempType = -1;

  for (var i = 0; i < queueActs.length; i++) {

    tempX = queueActs[i]["x"];
    tempY = queueActs[i]["y"];
    tempType = queueActs[i]["type"];
    tempTTL = queueActs[i]["ttl"];
    queueActs[i]["ttl"] -= 1

    if(tempTTL <= 0){
      // var index = findIndex(tempX, tempY);
      // queueActs.splice(index, 1)
    }

    for (var j = 0; j < arraySnake.length; j++) {
      snakeX = arraySnake[j][0];
      snakeY = arraySnake[j][1];
      type = arraySnake[j][2];

      if(snakeY === tempY && snakeX === tempX){
        arraySnake[j][2] = tempType;

        if(i == 0 && j == arraySnake.length - 1){
          if(tempType === 0 && arraySnake[arraySnake.length - 1][0] > snakeX){
           queueActs.shift();
          }
          else if(tempType === 1 && arraySnake[arraySnake.length - 1][0] < snakeX){
          queueActs.shift();
          }
          else if(tempType === 2 && arraySnake[arraySnake.length - 1][1] > snakeY){
           queueActs.shift();
          }
          else if(tempType === 3 && arraySnake[arraySnake.length - 1][1] < snakeY){
           queueActs.shift();
          }

        }
      }
    }

  }


    for (var j = 0; j < arraySnake.length; j++) {
      type = arraySnake[j][2]
      changeSnake(type, j);
    }

    var headX = arraySnake[0][0];
    var headY = arraySnake[0][1];

    var tempX = -1;
    var tempY = -1;

    for (var i = 1; i < arraySnake.length; i++) {
      tempX = arraySnake[i][0];
      tempY = arraySnake[i][1];

      if(headX === tempX && headY === tempY){
        errorPlay()
      }
    }


  printSnake();

  for (var i = 0; i < arrApple.length; i++) {
    for (var j = 0; j < arraySnake.length; j++) {
      if(arrApple[i][0] === arraySnake[j][0] && arrApple[i][1] === arraySnake[j][1]){
        points += 1;
        arrApple.splice(i, 1)
        i -= 1;
        console.log("apple")
        document.getElementById("points").innerHTML = strPoints + points;
        var newBlock = arraySnake[arraySnake.length -1];
        var typeOfBlock = newBlock[2];

        console.log("arraySnake " + arraySnake)
        if(typeOfBlock === 0){
          arraySnake.push([newBlock[0] - 1, newBlock[1], newBlock[2]])
          // newBlock[0] -= 1;
        }
        else if(typeOfBlock === 1){
          arraySnake.push([newBlock[0] + 1, newBlock[1], newBlock[2]])
          // newBlock[0] += 1;
        }
        else if(typeOfBlock === 2){
          arraySnake.push([newBlock[0], newBlock[1] - 1, newBlock[2]])
          // newBlock[1] -= 1;
        }
        else if(typeOfBlock === 3){
          arraySnake.push([newBlock[0], newBlock[1] + 1, newBlock[2]])
            // newBlock[1] += 1;
        }
        console.log("arraySnake " + arraySnake)

        // arraySnake.push(newBlock)

        for (var k = 0; k < queueActs.length; k++) {
          queueActs[k]["ttl"] += 1;
        }

      }
    }
  }
}

function changeSnake(typeOfDirection, indexArray){
  arraySnake[indexArray][2] = typeOfDirection;

  if(typeOfDirection === 0){
    arraySnake[indexArray][0] += 1;

  } else if (typeOfDirection === 1) {
    arraySnake[indexArray][0] -= 1;

  } else if (typeOfDirection === 2) {
    arraySnake[indexArray][1] += 1;

  } else if (typeOfDirection === 3) {
    arraySnake[indexArray][1] -= 1;
  }

}

function printSnake() {
  console.log(arraySnake.length + " " + arraySnake)

  var snakeX;
  var snakeY;

  for (var i = 0; i < arraySnake.length; i++) {
    var snakeX = arraySnake[i][0];
    var snakeY = arraySnake[i][1];

    paintBlock(snakeX, snakeY)

    if(i === 0){
      paintHead(snakeX, snakeY)
    }else{
      paintBlock(snakeX, snakeY)
    }


    if(i === arraySnake.length - 1){
      //clearBlock(snakeX - 2, snakeY);
      clear(i);


    }

  }
}
function clear(index){
  var type = arraySnake[index][2];
  var snakeX = arraySnake[index][0];
  var snakeY = arraySnake[index][1];


  if(type === 0){
    clearBlock(snakeX - 1, snakeY);
  }
  else if(type === 1){
    clearBlock(snakeX + 1, snakeY);

  }else if(type === 2){
    clearBlock(snakeX, snakeY - 1);

  }else if(type === 3){
    clearBlock(snakeX, snakeY + 1);
  }
}

function keys(e) {
  //document.getElementById("bb").innerHTML = "\n" + e.key;
  var direction = -1;
  var snakeXNow = arraySnake[0][0];
  var snakeYNow = arraySnake[0][1];


  if(e.key === "ArrowLeft"){
    direction = 0;
  }
  else if(e.key === "ArrowRight"){
    direction = 1;
  }
  else if(e.key === "ArrowDown"){
    direction = 2;
  }
  else if(e.key === "ArrowUp"){
    direction = 3;
  }
  var isOk = false;

  var tempObj = {
    "x": snakeXNow,
    "y": snakeYNow,
    "type": direction,
    "ttl": arraySnake.length - 1
  }

  if((direction === 0 || direction === 1) && (arraySnake[0][0] === snakeXNow)){
    if(arraySnake[0][2] != 0 && arraySnake[0][2] != 1){
      queueActs.push(tempObj);
    }
  }else if((direction === 2 || direction === 3) && (arraySnake[0][1] === snakeYNow)){
      if(arraySnake[0][2] != 2 && arraySnake[0][2] != 3){
        queueActs.push(tempObj);
      }
    }

}

function findIndex(x, y){
  var index = -1;
  for (var i = 0; i < queueActs.length; i++) {
    tempX = queueActs[i]["x"];
    tempY = queueActs[i]["y"];

    if(tempX === x && tempY === y){
      index = i;
    }
  }
  return index;
}

function paintApple(x, y){

  var idBlock = 'block' + x + '_' + y;
  document.getElementById(idBlock).style.background = colorApple;
}

function createApple() {
  if(arrApple.length > 5){
    return false;
  }

  var randX = arraySnake[0][0];
  var randY = arraySnake[0][1];
  var range = (sizeBoard / sizeBlock) - 1;
  while(!chekRand(randX, randY)){
    randX = Math.floor(Math.random() * range);
    randY = Math.floor(Math.random() * range);
  }
  // randX = arraySnake[0][0] + 1;
  // randY = arraySnake[0][1];
  paintApple(randX, randY);
  arrApple.push([randX, randY])
}

function chekRand(x, y) {
  for (var i = 0; i < arraySnake.length; i++) {
    if(arraySnake[i][0] === x && arraySnake[i][1] === y){
      return false;
    }

    for (var j = 0; j < arrApple.length; j++) {
      if(arrApple[j][0] === x && arrApple[j][1] === y){
        return false;
      }
    }
  }
  return true;
}

function moves() {
  if(!isloss){
    move()
  }
}

function createApples() {
  if(!isloss){
    createApple()
  }
}

function replay() {
  location.reload()
}

function errorPlay() {
  isloss = true;
  document.getElementById("board").innerHTML = "<h1>GAME OVER</h1>"
  document.getElementById("board").innerHTML += "<h2 onclick='replay()'>REPLAY ↻</h2> "
}


//select
function getSelectionText() {
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
      (activeElTagName == "textarea") || (activeElTagName == "input" &&
      /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
      (typeof activeEl.selectionStart == "number")
    ) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}

document.onselectionchange = function() {
  //alert(getSelectionText());
};
