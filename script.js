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
        question: "what is the '<' symbol used for",
        answers: [
            { text: "Less than", correct: true },
            { text: "Greater than", correct: false },
            { text: "Equal to", correct: false },
            { text: "Creating a function", correct: false }
        ]
    },
    {
        question: "To return a value back after a function you must",
        answers: [
            { text: "Use 'return'", correct: true },
            { text: "Use an equal sign", correct: false },
            { text: "Leave blank", correct: false },
            // { text: "", correct: false }
        ]
    },
    {
        question: "what is HTML and CSS used for?",
        answers: [
            { text: "Styling the page", correct: true },
            { text: "Adding functions", correct: false },
            { text: "Nothing", correct: false },
            { text: "All of the above", correct: false }
        ]
    },
    {
        question: "what is the '*' symbol used to do",
        answers: [
            { text: "Divide", correct: false },
            { text: "Add", correct: false },
            { text: "Get square root", correct: false },
            { text: "Multiply", correct: true }
        ]
    },
    {
        question: "which is an api?",
        answers: [
            { text: "HTML", correct: false },
            { text: "Javascript", correct: false },
            { text: "CSS", correct: true },
            { text: "Bootstrap", correct: false }
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
    nextQuestion()
    var sec = 21
    var timeUpdate = setInterval(() => {
        sec--;
        timerEl.innerHTML = '00:' + sec;
        if (sec < 10) {
            timerEl.innerHTML = '00:0' + sec;
        }
        if (sec < 0) {
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
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }

        button.addEventListener("click", pickAnswer)
        answerBtnEl.appendChild(button)

    })


}

function pickAnswer(event) {
    var selectedAnswer = event.target
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

