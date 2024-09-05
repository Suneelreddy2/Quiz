const questions = [
    {
        question: "What does CPU stand for?",
        answers: [
            {text: "Central Process Unit", correct: false},
            {text: "Central Processing Unit", correct: true},
            {text: "Computer Personal Unit", correct: false},
            {text: "Central Processor Unit", correct: false},
        ]
    },
    {
        question: "Which language is known as the backbone of web development?",
        answers: [
            {text: "Python", correct: false},
            {text: "Java", correct: false},
            {text: "JavaScript", correct: true},
            {text: "C++", correct: false},
        ]
    },
    {
        question: "What is the time complexity of binary search?",
        answers: [
            {text: "O(n)", correct: false},
            {text: "O(n^2)", correct: false},
            {text: "O(log n)", correct: true},
            {text: "O(1)", correct: false},
        ]
    },
    {
        question: "Which sorting algorithm is considered the fastest in practice for most cases?",
        answers: [
            {text: "Bubble Sort", correct: false},
            {text: "Merge Sort", correct: false},
            {text: "Quick Sort", correct: true},
            {text: "Selection Sort", correct: false},
        ]
    },
    {
        question: "Which of the following is not a programming paradigm?",
        answers: [
            {text: "Object-Oriented", correct: false},
            {text: "Functional", correct: false},
            {text: "Procedural", correct: false},
            {text: "Recursive", correct: true},
        ]
    },
    {
        question: "What is the space complexity of a depth-first search (DFS) on a graph?",
        answers: [
            {text: "O(1)", correct: false},
            {text: "O(n)", correct: true},
            {text: "O(n^2)", correct: false},
            {text: "O(log n)", correct: false},
        ]
    },
    {
        question: "Which data structure uses LIFO (Last In, First Out) principle?",
        answers: [
            {text: "Queue", correct: false},
            {text: "Stack", correct: true},
            {text: "Linked List", correct: false},
            {text: "Binary Tree", correct: false},
        ]
    },
    {
        question: "Which protocol is used to send email?",
        answers: [
            {text: "FTP", correct: false},
            {text: "HTTP", correct: false},
            {text: "SMTP", correct: true},
            {text: "SSH", correct: false},
        ]
    },
    {
        question: "Which of the following is a NoSQL database?",
        answers: [
            {text: "MySQL", correct: false},
            {text: "MongoDB", correct: true},
            {text: "PostgreSQL", correct: false},
            {text: "OracleDB", correct: false},
        ]
    },
    {
        question: "What is the primary purpose of an operating system?",
        answers: [
            {text: "To manage software", correct: false},
            {text: "To manage hardware", correct: true},
            {text: "To manage the Internet", correct: false},
            {text: "To manage databases", correct: false},
        ]
    },
    {
        question: "Which of the following is a low-level programming language?",
        answers: [
            {text: "Python", correct: false},
            {text: "C", correct: true},
            {text: "Java", correct: false},
            {text: "Ruby", correct: false},
        ]
    },
    {
        question: "Which algorithm is used for finding the shortest path in a graph?",
        answers: [
            {text: "DFS", correct: false},
            {text: "BFS", correct: false},
            {text: "Dijkstra's Algorithm", correct: true},
            {text: "Bellman-Ford Algorithm", correct: false},
        ]
    },
    {
        question: "What does 'OOP' stand for in programming?",
        answers: [
            {text: "Overt Object Program", correct: false},
            {text: "Object-Oriented Programming", correct: true},
            {text: "Object-Operation Procedure", correct: false},
            {text: "Optimal Output Processing", correct: false},
        ]
    },
    {
        question: "Which of the following is an example of a dynamic programming problem?",
        answers: [
            {text: "Binary Search", correct: false},
            {text: "Knapsack Problem", correct: true},
            {text: "Quick Sort", correct: false},
            {text: "Merge Sort", correct: false},
        ]
    },
    {
        question: "Which type of memory is non-volatile?",
        answers: [
            {text: "RAM", correct: false},
            {text: "ROM", correct: true},
            {text: "Cache", correct: false},
            {text: "Registers", correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const startButton = document.getElementById("start-btn");
const startContainer = document.querySelector(".start-container");
const appContainer = document.querySelector(".app");
const scoreContainer = document.querySelector(".score-container");

let currentQuestionIndex = 0;
let score = 0;
let startTime;
let timerInterval;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    startTime = new Date(); // Start the global timer
    startTimer(); // Start the global timer
    startContainer.style.display = "none"; // Hide the start screen
    scoreContainer.style.display = "none"; // Hide the score screen
    appContainer.style.display = "block"; // Show the quiz container
    showQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        const currentTime = new Date();
        const totalTime = Math.floor((currentTime - startTime) / 1000); // Calculate total time in seconds
        timerElement.innerHTML = `Total Time: ${totalTime} seconds`; // Display the timer on the screen
    }, 1000);
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    clearInterval(timerInterval); // Stop the global timer

    const endTime = new Date();
    const totalTime = Math.floor((endTime - startTime) / 1000); // Calculate total time in seconds

    // Clear the question and answer elements
    questionElement.innerHTML = '';
    answerButtons.innerHTML = '';

    // Display the final score and time
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!<br/>Total time: ${totalTime} seconds`;
    
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz(); // Restart the quiz when "Play Again" is clicked
    }
});

startButton.addEventListener("click", startQuiz); // Start the quiz on button click