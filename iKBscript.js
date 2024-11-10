// Array to store daily quiz questions
const dailyQuestions = [
    {
        date: "10/28/24",
        category: "NFL",
        question: "Who threw for the most yards in week 8 2024?",
        options: ["Baker Mayfield", "Jameis Winston", "Trevor Lawrence", "Patrick Mahomes"],
        correctAnswer: "Jameis Winston"
    },
    {
        date: "10/28/24",
        category: "NFL",
        question: "Who was the first player to rush for over 2,000 yards in a single season since 2015?",
        options: ["Derrick Henry", "Adrian Peterson", "Todd Gurley", "Le'Veon Bell"],
        correctAnswer: "Derrick Henry"
    },
    {
        date: "10/28/24",
        category: "NFL",
        question: "Who is the only player to win the NFL MVP award unanimously since 2015?",
        options: ["Tom Brady", "Aaron Rodgers", "Lamar Jackson", "Patrick Mahomes"],
        correctAnswer: "Lamar Jackson"
    },
    {
        date: "10/28/24",
        category: "NFL",
        question: "Who holds the record for the most career interceptions thrown as of 2023?",
        options: ["Tom Brady", "Brett Favre", "Joe Montana", "Eli Manning"],
        correctAnswer: "Brett Favre"
    },
    {
        date: "10/28/24",
        category: "NFL",
        question: "Which NFL team has never appeared in a Super Bowl as of 2023?",
        options: ["Jacksonville Jaguars", "Houston Texans", "Chicago Bears", "Minnesota Vikings"],
        correctAnswer: "Houston Texans"
    },
    {
        date: "10/28/24",
        category: "NFL",
        question: "How many teams did Adrian Peterson play for in his career?",
        options: ["5", "7", "8", "4"],
        correctAnswer: "8"
    },
    {
        date: "10/28/24",
        category: "NFL",
        question: "How many MVPs does Patrick Mahomes have?",
        options: ["1", "2", "3", "4"],
        correctAnswer: "2"
    },
    {
        date: "10/28/24",
        category: "NFL",
        question: "What team was quarterback Drew Brees drafted by?",
        options: ["New Orleans Saints", "Pittsburgh Steelers", "San Diego Chargers", "Atlanta Falcons"],
        correctAnswer: "San Diego Chargers"
    },
    {
        date: "10/28/24",
        category: "NFL",
        question: "Who led the NFL in receiving yards in 2023?",
        options: ["Justin Jefferson", "CeeDee Lamb", "Ja'Marr Chase", "Tyreek Hill"],
        correctAnswer: "Tyreek Hill"
    },
    {
        date: "10/28/24",
        category: "NFL",
        question: "What is the record for most touchdown passes thrown in a game?",
        options: ["6", "7", "8", "9"],
        correctAnswer: "7"
    }
];

// Function to get today's questions
function getTodaysQuestions() {
    const today = new Date().toLocaleDateString(); // Format: MM/DD/YY
    return dailyQuestions.filter(question => question.date === today);
}

// Load player data from local storage or initialize for today
function loadDailyPlayerData() {
    const today = new Date().toLocaleDateString();
    const storedData = JSON.parse(localStorage.getItem("dailyPlayerData")) || {};

    if (storedData.date !== today) {
        storedData.date = today;
        storedData.playerCount = 0;
    }

    return storedData;
}

// Save player data to local storage
function saveDailyPlayerData(data) {
    localStorage.setItem("dailyPlayerData", JSON.stringify(data));
}

// Update and show the player's rank
function updatePlayerRank() {
    const dailyData = loadDailyPlayerData();
    dailyData.playerCount++;

    const playerRank = dailyData.playerCount;
    const totalPlayers = dailyData.playerCount;
    document.getElementById("player-rank").innerText = `You are player ${playerRank}/${totalPlayers} to take the quiz today.`;

    saveDailyPlayerData(dailyData);
}

// Variables for quiz logic
let score = 0;
let currentQuestionIndex = 0;
let todaysQuestions = [];
let results = [];

// Function to start the quiz
function startQuiz() {
    todaysQuestions = getTodaysQuestions();
    if (todaysQuestions.length === 0) {
        alert("No quiz available for today.");
        return;
    }

    updatePlayerRank(); // Show player ranking
    score = 0;
    currentQuestionIndex = 0;
    results = []; // Reset results array
    displayQuestion(currentQuestionIndex);
    document.getElementById("question-section").style.display = "block";
}

// Display a question
function displayQuestion(index) {
    const question = todaysQuestions[index];
    document.getElementById("question").innerText = question.question;

    const answerList = document.getElementById("answers");
    answerList.innerHTML = ""; // Clear previous options
    question.options.forEach(option => {
        const li = document.createElement("li");
        li.innerText = option;
        li.onclick = () => checkAnswer(option, question.correctAnswer);
        answerList.appendChild(li);
    });
}

// Check the selected answer
function checkAnswer(selectedAnswer, correctAnswer) {
    const feedback = document.getElementById("feedback");
    if (selectedAnswer === correctAnswer) {
        score++;
        feedback.innerText = "Correct!";
        feedback.style.color = "green";
        results.push({ correct: true });
    } else {
        feedback.innerText = "Incorrect!";
        feedback.style.color = "red";
        results.push({ correct: false });
    }
    feedback.style.display = "block";

    // Disable further selections after an answer is chosen
    const answerList = document.getElementById("answers").children;
    for (let i = 0; i < answerList.length; i++) {
        answerList[i].onclick = null; // Remove click event
    }
}

// Move to the next question
function nextQuestion() {
    document.getElementById("feedback").style.display = "none"; // Hide feedback
    currentQuestionIndex++;

    if (currentQuestionIndex < todaysQuestions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        document.getElementById("question-section").style.display = "none";
        completeQuiz();
    }
}

// Show quiz results in a pop-up
function showQuizResults(score, totalQuestions) {
    const resultPopup = document.getElementById("quiz-result-popup");
    const resultScore = document.getElementById("final-score");
    const resultDetails = document.getElementById("result-details");

    // Update the score display
    resultScore.textContent = `${score} / ${totalQuestions}`;

    // Clear previous results
    resultDetails.innerHTML = '';

    // Add results for each question
    results.forEach((result) => {
        const resultElement = document.createElement('div');
        resultElement.innerHTML = result.correct ? 
            `<span class="correct">&#10003;</span>` : 
            `<span class="incorrect">&#10006;</span>`;
        resultDetails.appendChild(resultElement);
    });

    // Show the pop-up
    resultPopup.style.display = 'flex';
}

// Close pop-up function
function closePopup() {
    document.getElementById("quiz-result-popup").style.display = 'none';
}

// Complete quiz and show results
function completeQuiz() {
    const totalQuestions = todaysQuestions.length; // Total questions
    showQuizResults(score, totalQuestions);
}

const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format

// Example URL for published Google Sheets CSV
const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6KVsIgB1U8CQrHa61J4Po1qfZa_0Pgp8255PmrMTOOi66T1BF8GbBRRhmMbz7JJNOG3zuzGg8-tju/pub?gid=0&single=true&output=csv';

async function fetchQuestions() {
    const response = await fetch(sheetUrl);
    const text = await response.text();

    // Parse CSV data
    const rows = text.split('\n').map(row => row.split(','));
    const headers = rows[0];
    const data = rows.slice(1);

    // Filter questions for today's date
    const todayQuestions = data.filter(row => row[headers.indexOf('Date')] === today);

    // Format questions
    return todayQuestions.map(row => ({
        date: row[headers.indexOf('Date')],
        category: row[headers.indexOf('Category')],
        question: row[headers.indexOf('Question')],
        options: [
            row[headers.indexOf('Option1')],
            row[headers.indexOf('Option2')],
            row[headers.indexOf('Option3')],
            row[headers.indexOf('Option4')],
        ],
        correctAnswer: row[headers.indexOf('CorrectAnswer')]
    }));
}

async function startQuiz() {
    const questions = await fetchQuestions();
    if (questions.length > 0) {
        displayQuestion(questions[0]); // Assuming a single question for demonstration
    } else {
        alert('No quiz available for today.');
    }
}

function displayQuestion(question) {
    document.getElementById("question").innerText = question.question;
    const answerList = document.getElementById("answers");
    answerList.innerHTML = "";

    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.onclick = () => checkAnswer(button, option, question.correctAnswer);
        button.classList.add("answer-button");
        answerList.appendChild(button);
    });
}

function checkAnswer(button, selectedAnswer, correctAnswer) {
    if (!hasAnswered) {
        const buttons = document.querySelectorAll(".answer-button");

        // Disable all buttons to prevent further selection
        buttons.forEach(btn => btn.disabled = true);

        // Highlight the correct answer in green
        buttons.forEach(btn => {
            if (btn.innerText.startsWith(correctAnswer)) {
                btn.classList.add("correct-answer"); // Add correct class
            }
        });

        // If selected answer is wrong, highlight it in red
        if (selectedAnswer !== correctAnswer) {
            button.classList.add("incorrect-answer"); // Add incorrect class
        } else {
            score++; // Increment score if correct
        }

        // Add the 'selected' class to stop hover effect
        button.classList.add('selected'); // Prevent hover and keep color

        hasAnswered = true; // Mark the question as answered
    }
    let hasAnswered = false;
let score = 0;

let hasAnswered = false;
let score = 0;

function checkAnswer(button, selectedAnswer, correctAnswer) {
    if (!hasAnswered) {
        const buttons = document.querySelectorAll(".answer-button");

        // Disable all buttons to prevent further selection
        buttons.forEach(btn => btn.disabled = true);

        // Highlight the correct answer in green
        buttons.forEach(btn => {
            if (btn.innerText.startsWith(correctAnswer)) {
                btn.classList.add("correct-answer"); // Add correct class
            }
        });

        // If selected answer is wrong, highlight it in red
        if (selectedAnswer !== correctAnswer) {
            button.classList.add("incorrect-answer"); // Add incorrect class
        } else {
            score++; // Increment score if correct
        }

        // Add the 'selected' class to stop hover effect and keep the color
        button.classList.add('selected'); // Prevent hover and keep color

        hasAnswered = true; // Mark the question as answered
    }
}

function showQuizResults() {
    // Assuming your code collects the score and answers, you can now show the results popup
    const resultPopup = document.getElementById('quiz-result-popup');
    const resultDetails = document.getElementById('result-details');

    resultPopup.style.display = 'block'; // Show popup

    // Add result details (correct/incorrect answers with emojis)
    resultDetails.innerHTML = 'Your Score: ' + score + '/10\n\n' + generateResultDetails();
}

function generateResultDetails() {
    // Generate the list of results (correct/incorrect answers with emojis)
    let resultText = '';
    // Example - you can modify this part based on your results collection
    // Assuming you have an array of answers with emojis and correct/incorrect feedback
    resultText += '🟢 Question 1: Correct\n';
    resultText += '🔴 Question 2: Incorrect\n';
    // Repeat for all questions...
    return resultText;
}

}