let intro = document.querySelector("#intro");
let startBt = document.querySelector("#startBt");
let timerEl = document.querySelector("#timer");
let viewHs = document.querySelector("#highScores");
let time = 75;
let questions = ["Commonly used data types DO NOT include ____.", "The condition in an if / else statement is enclosed within ____.", "Arrays in JavaScript can be used to store ____.", "String values must be enclosed within ____ when being assigned to letiables", "A very useful tool used during development and debugging for pringing content to the debugger is ____"];
let answers = [["alerts", "booleans", "strings", "numbers"], ["quotes", "curly brackets", "parenthesis", "square brackets"], ["numbers and strings", "other arrays", "all of the above", "booleans" ], ["commas", "curly brackets", "quotes", "parenthesis"], ["JavaScript", "terminal / bash", "for loops", "console.log"]]
let correct = [[ true,false, false, false], [false, true, false, false], [false, false, true, false], [false, false, true, false], [false, false, false, true]]
let choices = [document.createElement("button"), document.createElement("button"), document.createElement("button"), document.createElement("button")];
let random;
let questNum = 1;
let viewingHs = false;
let twoSecs = 75;
let pEl = document.createElement("p");
let inputEl = document.createElement("input");
let articleEl = document.createElement("article")
let submitBt = document.createElement("button");
let ulEl = document.createElement("ul");
let clearHs = document.createElement("button")
let resetBt = document.createElement("button")
let response = document.createElement("p")
let highScores = JSON.parse(localStorage.getItem("highScores"))
pEl.textContent = "Enter users: ";

if (JSON.parse(localStorage.getItem("highScores")) === null) {
    localStorage.setItem("highScores", JSON.stringify([]));
};

submitBt.textContent = "Submit";

pEl.setAttribute("style", "margin-right: 10px; width: fit-content;");

inputEl.setAttribute("style", "position: relative; left: 150px; top: -41px; height: 20px");

submitBt.setAttribute("style", "position: relative; left: 160px; top: -35px; margin-top: 0px;");

articleEl.setAttribute("style", "display: none; margin: 10px; margin-left: 20%; height: 15px;");

clearHs.setAttribute("style", "display: none;");

resetBt.setAttribute("style", "display: none;");

response.setAttribute("style", "display: block; color: black;")
intro.appendChild(ulEl);
intro.appendChild(clearHs);
intro.appendChild(resetBt);
intro.appendChild(articleEl);
articleEl.appendChild(pEl);
articleEl.appendChild(inputEl);
articleEl.appendChild(submitBt);
clearHs.textContent = "Clear Highscores";
resetBt.textContent = "Go back";

for (i in choices) {
    intro.appendChild(choices[i]);
    choices[i].setAttribute("style", "display: none;");
    choices[i].setAttribute("id", (parseInt(i) + 1).toString());
    choices[i].setAttribute("class", "answers")
}
startBt.addEventListener("click", start);

intro.addEventListener("click", function(event) {
    let element = event.target;

    if (element.matches(".answers")) {
        verifyAns(element);
    }
});

submitBt.addEventListener("click", function() {
    let randObj = {
        names: inputEl.value,
        scores: time
    };
    highScores.push(randObj);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    openHs();
});

viewHs.addEventListener("click", openHs)


clearHs.addEventListener("click", function() {
    localStorage.setItem("highScores", JSON.stringify([]));
    highScores = [];
    for (i in randVar) {
        ulEl.children[i].textContent = "";
    }
    console.log(ulEl)
    ulEl.setAttribute("style", "display: none;");
});

resetBt.addEventListener("click", reset);

intro.appendChild(response);

function reset() {
    time = 75;
    timerEl.textContent = time;
    questNum = 1;
    intro.setAttribute("style", "display: flex;");
    intro.children[0].setAttribute("style", "align-self: centermargin-left: 0px;");
    intro.children[0].textContent = "Coding Quiz Challenge";
    let stringlet = "Try to answer the following code-related questions within the time <br>limit. Keep in mind that incorrect answers will penalize your score/time <br>by ten seconds";
    intro.children[1].innerHTML = stringlet;
    intro.children[1].setAttribute("style", "display: block;");
    intro.children[2].setAttribute("style", "display: block;") ;  
    resetBt.setAttribute("style", "display: none;") ;
    clearHs.setAttribute("style", "display: none;") ;
    ulEl.setAttribute("style", "display: none");
    highScores = JSON.parse(localStorage.getItem("highScores"));
    viewingHs = false;
    inputEl.value = "";
    twoSecs = 2;
};

function int() {
    let interval = setInterval(function() {
        if (!((questNum - 1) < questions.length) || viewingHs) { 
            timerEl.textContent = time;
            response.setAttribute("style", "display: none");
            clearInterval(interval);
            return;
        }

        if ((twoSecs - time) === 2 ) {
            response.setAttribute("style", "display: none");
        }

        if (time <= 0) {
            time = 0
            timeEl.textContent = time;
            response.setAttribute("style", "display: none");
            over();
            clearInterval(interval);
            return;
        } else {
            time--;
            timerEl.textContent = time;
        }
        
    }, 1000);
};

function openHs() {
    intro.setAttribute("style", "display: block;")
    intro.children[0].textContent = "Highscores";
    intro.children[0].setAttribute("style", "text-align: left; margin-left: 20%;");
    intro.children[1].setAttribute("style", "display: none");
    response.setAttribute("style", "display: none");
    articleEl.setAttribute("style", "display: none");
    startBt.setAttribute("style", "display: none;");
    if (JSON.parse(localStorage.getItem("highScores")) === null) {
        localStorage.setItem("highScores", JSON.stringify([]));
    }
    randVar = JSON.parse(localStorage.getItem("highScores"))
        randVar.sort(function(a, b) {
        return b.scores - a.scores
    });

    for (i in randVar) {
        ulEl.appendChild(document.createElement("li"));
        ulEl.children[i].textContent = (parseInt(i) + 1) + ". " + randVar[i]["names"] + " - " + randVar[i]["scores"];
        ulEl.setAttribute("style", "background: #247ec9; width: 50%; margin-left: 20%; margin-top: 15px;");
    }

    clearHs.setAttribute("style", "display: block; margin-left: 20%; position: relative; top: 30px; left: 220px;")
    resetBt.setAttribute("style", "display: block; margin-left: 20%; margin-right: 20px; position: relative; top: -50px;")
    for (i in choices) {
        choices[i].setAttribute("style", "display: none;");
    }
    viewingHs = true;
};

function over() {
    intro.children[0].textContent = "Time up!";
    for (i in choices) {
        choices[i].setAttribute("style", "display: none;");
    }
    resetBt.setAttribute("style", "display: block; margin-left: 20%;")
    resetBt.textContent = "Restart"
};

function users() {
    intro.children[0].textContent = "All done!";
    intro.children[1].textContent = "Your final score is " + time + "!";
    intro.children[1].setAttribute("style", "display: block; text-align: left; margin-left: 20%;")
    articleEl.setAttribute("style", "margin-left: 20%; margin-top: 20px; display: inline-block;")
    for (i in choices) {
        choices[i].setAttribute("style", "display: none;");
    }
};

function nextQuest() {
    questNum++;
    if (((questNum - 1) < questions.length) && (time != 0)) {
        showQuest();
    } else if(time <= 0) {
        time = 0;
        over();
    } else {
        response.setAttribute("style", "display: none")
        users();
    }
    return;
};

function verifyAns(element) {
    if ((questNum - 1) < questions.length) {
        if (correct[questNum - 1][parseInt(element.id) - 1]) {
            response.textContent = "Correct! "
            response.setAttribute("style", "display: block; text-align: left; margin-left: 20%; margin-top: 30px; padding-top: 8px; border-top: 2px solid gray;");
            twoSecs = time + 1;
        } else {
            time -= 10;
            timerEl.textContent = time + 1;
            twoSecs = time;
            response.textContent = "Wrong! "
            response.setAttribute("style", "display: block; text-align: left; margin-left: 20%; margin-top: 30px; padding-top: 8px; border-top: 2px solid gray;");
        }
        nextQuest();
    }
    return;
};

function showQuest() {
    intro.children[0].textContent = questions[questNum - 1];
    for (i in choices) {
        choices[i].textContent = (parseInt(i) + 1) + ". " + answers[questNum - 1][i];
        choices[i].setAttribute("style", `position: relative; top: ${(20 + "px")}; display: block; width: fit-content;`)
    }
    return;
};

function start() {
    intro.children[0].setAttribute("style", "align-self: flex-start; margin-left: 20%;");
    intro.children[1].setAttribute("style", "display: none;");
    intro.children[2].setAttribute("style", "display: none");
    intro.setAttribute("style", "display: block;")
    showQuest();
    int();
    return;
};

