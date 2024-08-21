let focusCircle = 1;
let guessColors = [];
let newGuessColors = [];
let secretColors = [];
let colorsNames = ["red", "orange", "yellow", "green", "blue", "purple", "pink"];
let colors = ["#d40202", "#fa931d", "#ffff00", "#23ce23", "#0b93bd", "#aa0394", "#fc389c"];
let maxTrials;
let chooseLevel;
let trials;

let startGame = function () {
    trials = 1;
    numRow = 1;
    secretColors = [];
    focusCircle = 1;
    document.getElementById("wining").style.visibility = "hidden";

    let colorIndex = 0;
    for (let i = 0; i < 4; i++) {
        colorIndex = Math.floor(Math.random() * 7);
        secretColors[i] = colorsNames[colorIndex];
    }
    console.log(secretColors);
    createCircles();
}

let createCircles = function () {
    guessColors = [];
    newGuessColors = [];
    focusCircle = 1;
    let circles = document.getElementById("circles");

    let checking = document.createElement("div");
    checking.id = "checking";
    circles.appendChild(checking);
    let buttonCheck = document.createElement("button");
    buttonCheck.id = "button-check";
    checking.appendChild(buttonCheck);
    buttonCheck.innerHTML = "בדיקה";
    buttonCheck.addEventListener("click", checkGuess);

    let circle;
    for (let i = 1; i <= 4; i++) {
        circle = document.createElement("div");
        circle.className = "circle";
        circle.id = `circle-${i}`;
        circles.appendChild(circle);
        circle.addEventListener("click", function () {
            if (circle.id === "circle-1" || circle.id === "circle-2" || circle.id === "circle-3" || circle.id === "circle-4")
                setFocus(i);
        });
    }
    let firstCircle = document.getElementById("circle-1");
    firstCircle.classList.add("get-color-focus");
}

let setColor = function (index) {
    let circle = document.getElementById("circle-" + focusCircle);
    circle.style.backgroundColor = colors[index];

    guessColors[focusCircle - 1] = colorsNames[index];
    newGuessColors[focusCircle - 1] = colors[index];
    if (focusCircle !== 4) {
        setFocus(focusCircle + 1);
    }
}

let setFocus = function (numCircle) {
    focusCircle = numCircle;

    for (let i = 1; i <= 4; i++) {
        document.getElementById("circle-" + i).classList.remove("get-color-focus");
    }
    document.getElementById("circle-" + numCircle).classList.add("get-color-focus");
}

let checkGuess = function () {
    if (!guessColors[0] || !guessColors[1] || !guessColors[2] || !guessColors[3]) {
        alert("יש לבחור ארבעה צבעים");
        return;
    }

    let checking = document.getElementById("checking");
    checking.innerHTML = " ";

    mark();
}

let mark = function () {
    let copySecret = [];
    bullCounter = 0;
    existCounter = 0;
    for (let i = 0; i < secretColors.length; i++) {
        copySecret[i] = secretColors[i];
    }
    for (let i = 0; i < guessColors.length; i++) {
        if (guessColors[i] === copySecret[i]) {
            bullCounter++;
            copySecret[i] = 0;
            guessColors[i] = 1;
        }
    }
    if (bullCounter == 4) {
        success();
    }
    else {
        if (trials == maxTrials) {
            gameOver();
        }
        else {
            for (let i = 0; i < guessColors.length; i++) {
                for (let j = 0; j < secretColors.length; j++) {
                    if (guessColors[i] == copySecret[j]) {
                        existCounter++;
                        copySecret[j] = 0;
                        break;
                    }
                }
            }

            let checking = document.getElementById("checking");
            let marking = document.createElement("div");
            marking.className = "marking";
            checking.appendChild(marking);
            marking.innerHTML = "בול: " + bullCounter + " פגיעה: " + existCounter;
            checking.id = "checking-" + trials;

            for (let i = 1; i <= 4; i++) {
                let circle = document.getElementById(`circle-${i}`);
                circle.classList.remove("get-color-focus");
                circle.id = "circle-" + i + "-" + trials;
                circle.style.backgroundColor = newGuessColors[i - 1];
            }
            createCircles();
            trials++;
        }
    }
}

let success = function () {
    let sum = 80 + (5 - trials) * 10;
    let wining = document.getElementById("wining");
    wining.style.visibility = "visible";
    let score = document.getElementById("score");
    score.innerHTML = `<p>מספר הנסיונות שלך הוא: ${trials}<br>ניקוד: ${sum}</p>`;
    wining.style.backgroundImage = "url(../images/photofunky.gif)";
    wining.style.backgroundRepeat = "repeat-x"; /**/
}

let gameOver = function() {
    let losing = document.getElementById("losing");
    losing.style.visibility = "visible";


}

let showLevels = function () {
    chooseLevel = document.getElementById("choose-level");
    chooseLevel.style.visibility = "visible";
    document.getElementById("circles").innerHTML = " ";
}

let openGame = function () {
    let newGame = document.getElementById("new-game");
    newGame.addEventListener("click", showLevels);
    showLevels();
}




let easy = document.getElementById("easy");
easy.addEventListener("click", function () {
    maxTrials = 10;
    chooseLevel.style.visibility = "hidden";
    startGame();
});

let medium = document.getElementById("medium");
medium.addEventListener("click", function () {
    maxTrials = 8;
    chooseLevel.style.visibility = "hidden";
    startGame();
});
let hard = document.getElementById("hard");
hard.addEventListener("click", function () {
    maxTrials = 6;
    chooseLevel.style.visibility = "hidden";
    startGame();
});

let instructions = document.getElementById("instructions");
instructions.addEventListener("click", function () {
   let gameInstructions = document.getElementById("game-instructions");
    gameInstructions.style.visibility = "visible";
});

let exitButton = document.getElementById("exit-button");
exitButton.addEventListener("click", function () {
    let gameInstructions = document.getElementById("game-instructions");
     gameInstructions.style.visibility = "hidden";
 });


let index;
for (let i = 0; i < 7; i++) {
    index = document.getElementById(colorsNames[i]);
    index.addEventListener("click", function () {
        setColor(i);
    });
}

let playAgain1 = document.getElementById("play-again1");
playAgain1.addEventListener("click", function () {
    document.getElementById("wining").style.visibility = "hidden";
    showLevels();
});

let playAgain2 = document.getElementById("play-again2");
playAgain2.addEventListener("click", function () {
    document.getElementById("losing").style.visibility = "hidden";
    showLevels();
});

document.getElementById("close1").addEventListener("click", function(){
    window.location = "./homePage.html";
});
document.getElementById("close2").addEventListener("click", function(){
    window.location = "./homePage.html";
});


openGame();