var playButton = document.getElementById("play-btn")
var quesionBoxEl = document.getElementById("question-box")
var nextBtnEl = document.getElementById("next-btn")
var questionEl = document.getElementById("question")
var answerBtnEl = document.getElementById("question-btns")
var highscoreBtnEl = document.getElementById("highscore-btn")
var scoreEl = document.getElementById("score")

var timerEl = document.getElementById("timer")



playButton.addEventListener("click", startGame)
nextBtnEl.addEventListener("click", () => {
    currentQuestionIndex++,
        nextQuestion()
});

var questions = [
    {
        question: "what is 1 + 1?",
        answers: [
            { text: "2", correct: true },
            { text: "40", correct: false },
            { text: "16", correct: false },
            { text: "5", correct: false }
        ]
    },
    {
        question: "what is 1 + 2?",
        answers: [
            { text: "3", correct: true },
            { text: "40", correct: false },
            { text: "16", correct: false },
            { text: "5", correct: false }
        ]
    },
    {
        question: "what is 1 + 3?",
        answers: [
            { text: "4", correct: true },
            { text: "40", correct: false },
            { text: "16", correct: false },
            { text: "5", correct: false }
        ]
    },
    {
        question: "what is 1 + 4?",
        answers: [
            { text: "2", correct: false },
            { text: "40", correct: false },
            { text: "16", correct: false },
            { text: "5", correct: true }
        ]
    },
    {
        question: "what is 8 + 8?",
        answers: [
            { text: "2", correct: false },
            { text: "40", correct: false },
            { text: "16", correct: true },
            { text: "5", correct: false }
        ]
    }

]
var dScore = scoreEl.innerText
var currentQuestion
var currentQuestionIndex


function startGame() {
    console.log("playing")
    currentQuestion = questions.sort()
    currentQuestionIndex = 0
    playButton.classList.add("hide")
    quesionBoxEl.classList.remove("hide")
    // function time() { } var sec = 20
    // timerEl.innerHTML = '00:' + sec;
    // sec--
    nextQuestion()
    var sec = 20
    var dScore = 0
    var timeUpdate = setInterval(() => {
        sec--;
        timerEl.innerHTML = '00:' + sec;
        if (sec < 10) {
            timerEl.innerHTML = '00:0' + sec;
        }
        if (sec <= 0) {
            clearInterval(timeUpdate)

            var playAgain = confirm("you're out of time, would you like to play again?")
            if (playAgain) {
                startGame()
            } else {
                playButton.classList.remove("hide")
                quesionBoxEl.classList.add("hide")
            }

        }
    }, 1000);

    // if (quesionBoxEl.answers = true) {

    // }


}


function nextQuestion() {
    nextBtnEl.classList.add("hide")
    resetQuestions();
    showQuestion(currentQuestion[currentQuestionIndex]);
}

function resetQuestions() {
    while (answerBtnEl.firstChild) {
        answerBtnEl.removeChild(answerBtnEl.firstChild)
    }
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        dScore = 0
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
            scoreEl.innerHTML = '' + dScore
            dScore++
        }

        button.addEventListener("click", pickAnswer)
        answerBtnEl.appendChild(button)

    })


}

function pickAnswer(event) {
    var selectedAnswer = event.target
    // var correct = selectedAnswer.dataset.correct
    Array.from(answerBtnEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (currentQuestion.length > currentQuestionIndex + 1) {
        nextBtnEl.classList.remove("hide")
    } else {
        playButton.innerText = "Restart"
        playButton.classList.remove("hide")
        quesionBoxEl.classList.add("hide")
    }
}


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

// function scoreUp() {
//
// }
