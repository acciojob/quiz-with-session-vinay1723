// Quiz questions
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load progress from sessionStorage if available
let storedProgress = sessionStorage.getItem("progress");
let userAnswers = storedProgress ? JSON.parse(storedProgress) : new Array(questions.length).fill(null);

// Function to save progress in sessionStorage
function saveProgress() {
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

// Render the questions and choices
function renderQuestions() {
  questionsElement.innerHTML = ""; // clear if re-rendering
  questions.forEach((q, i) => {
    const questionDiv = document.createElement("div");

    // Question text
    const p = document.createElement("p");
    p.textContent = q.question;
    questionDiv.appendChild(p);

    // Choices
    q.choices.forEach(choice => {
      const label = document.createElement("label");
      label.style.display = "block";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // If previously selected
      if (userAnswers[i] === choice) {
		  input.setAttribute("checked","true");
        input.checked = true;
      }

      // On change, update progress
      input.addEventListener("change", () => {
        userAnswers[i] = choice;
        saveProgress();
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
    });

    questionsElement.appendChild(questionDiv);
  });
}

// Render initially
renderQuestions();

// Handle submit
submitButton.addEventListener("click", () => {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

// On page load, if score already in localStorage, show it
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}
