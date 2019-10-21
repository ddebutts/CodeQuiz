const startDiv = document.getElementById("Start"),
    startBtn = document.getElementById("startBtn"),
    QuestionBox = document.getElementById("QuestionBox"),
    QuestionTitle = document.getElementById("QuestionDiv"),
    AnswerChoices = document.getElementById("answerChoices"),
    Timer = document.getElementById("timer"),
    highScoresBtn = document.getElementById("highScoresBtn");
    

let qIndex = 0, timer = 75, timerID, wrongAns = 0, numAns = 0, playerInit = "", score = "";

// this starts the game
startBtn.addEventListener("click", StartGame);

//this shows high scores
highScoresBtn.addEventListener("click", loadResults);


//This starts the timer 
function StartTimer() {
    clearInterval(timerID);

    timerID = setInterval(function () {
        timer--;
        if (timer < 0) {
            clearInterval(timerID)
            alert("Your Time has run out!")
            endGame();
        } else {
            Timer.innerText = timer;
        }
    }, 1 * 1000)
}


//this starts the game by hiding opening section and unhiding the questions section then starts the timer call and loads a question
function StartGame() {
    timer = 75, qIndex = 0;

    startDiv.classList.add("hide");
    QuestionBox.classList.remove("hide");

    StartTimer();
    getQuestion();
}

// this code retrieves a question and sets clicked question
function getQuestion() {
    const currQuestion = questions[qIndex];
    QuestionTitle.innerText = currQuestion.title;

    AnswerChoices.innerHTML = "";

    currQuestion.choices.forEach(function (choice, i) {
        const choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "btn btn-primary");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.innerText = choice;
        choiceBtn.onclick = clickQuestion;

        AnswerChoices.appendChild(choiceBtn);
    })
}


//this code checks for if not correct answer and decrements time.  It also checks to see if more questions if not ends the game.
function clickQuestion() {
    const correctAns = questions[qIndex].answer
    if (this.value !== correctAns) {
        timer -= 15;
        wrongAns++;
        console.log(wrongAns);
    }
    qIndex++;

    if (qIndex >= questions.length) {
        endGame();
    } else {
        numAns++;
        getQuestion();
        
    }
};


// this code is for ending the game.  Resets the timer and hides questions section and unhides opening section 
function endGame(){
    console.log("Your  in  the endgame")
    clearInterval(timerID);
    QuestionBox.classList.add("hide");
    startDiv.classList.remove("hide");
    
    saveGame();
};

//this code displays player score and save score after adding initials
function saveGame(){
    score = (numAns - wrongAns) * 10
    playerInit = prompt("Your score is : " + score + " Please enter your initials!");
    console.log("this is your score: " + score);
    console.log(playerInit)

    

    // Storing data:
    var gmJSON, gmobj;

    gmDataObj = { initials: playerInit, playerscore: score};
    gmJSON = JSON.stringify(gmDataObj);
    localStorage.setItem("PlayerScore", gmJSON);


};

//this gets results from local storage to list on high scores page
function loadResults(){
        // Retrieving data:
        results = localStorage.getItem("PlayerScore");
        gmobj = JSON.parse(results);
        //document.getElementById("demo").innerHTML = gmobj.name;
        console.log (results);
};
