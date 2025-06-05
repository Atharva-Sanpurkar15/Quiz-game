// Quiz questions
const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correct: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correct: 2
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Fe", "Au", "Cu"],
        correct: 2
    }
];

// Game variables
let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;
let canAnswer = true;

// DOM elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const scoreElement = document.getElementById('score-value');
const timeElement = document.getElementById('time');
const finalScoreElement = document.getElementById('final-score');
const feedbackElement = document.getElementById('feedback');

// Event listeners
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);

// Start the quiz
function startQuiz() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    loadQuestion();
    startTimer();
}

// Load question
function loadQuestion() {
    if (currentQuestion >= questions.length) {
        endQuiz();
        return;
    }

    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('div');
        button.className = 'option';
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });

    canAnswer = true;
}

// Handle answer selection
function selectAnswer(selectedIndex) {
    if (!canAnswer) return;
    canAnswer = false;

    const question = questions[currentQuestion];
    const options = optionsContainer.children;

    if (selectedIndex === question.correct) {
        options[selectedIndex].classList.add('correct');
        score += 10;
        scoreElement.textContent = score;
    } else {
        options[selectedIndex].classList.add('wrong');
        options[question.correct].classList.add('correct');
    }

    clearInterval(timer);
    setTimeout(() => {
        currentQuestion++;
        timeLeft = 30;
        timeElement.textContent = timeLeft;
        loadQuestion();
        startTimer();
    }, 1500);
}

// Timer functionality
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            if (canAnswer) {
                const options = optionsContainer.children;
                options[questions[currentQuestion].correct].classList.add('correct');
                setTimeout(() => {
                    currentQuestion++;
                    timeLeft = 30;
                    timeElement.textContent = timeLeft;
                    loadQuestion();
                    startTimer();
                }, 1500);
            }
        }
    }, 1000);
}

// End quiz
function endQuiz() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    finalScoreElement.textContent = score;

    // Provide feedback based on score
    const totalQuestions = questions.length;
    const percentage = (score / (totalQuestions * 10)) * 100;
    
    let feedback = '';
    if (percentage >= 80) {
        feedback = 'Excellent! You are a quiz master!';
    } else if (percentage >= 60) {
        feedback = 'Good job! You know your stuff!';
    } else if (percentage >= 40) {
        feedback = 'Not bad! Keep learning!';
    } else {
        feedback = 'Keep practicing! You can do better!';
    }
    
    feedbackElement.textContent = feedback;
}

// Restart quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 30;
    scoreElement.textContent = score;
    timeElement.textContent = timeLeft;
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
} 