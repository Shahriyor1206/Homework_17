const questions = [
  {
    question: "Correct syntax to print a page using JavaScript",
    answers: [
      { text: "A. window.print()", correct: true },
      { text: "B. browser.print()", correct: false },
      { text: "C. navigator.print()", correct: false },
      { text: "D. document.print()", correct: false },
    ],
  },
  {
    question: "Array object calls a function for each element in the array?",
    answers: [
      { text: "A. concat()", correct: false },
      { text: "B. every()", correct: false },
      { text: "C. filter()", correct: false },
      { text: "D. forEach()", correct: true },
    ],
  },
  {
    question: "Function of Array object sorts the elements of an array?",
    answers: [
      { text: "A. toSource()", correct: false },
      { text: "B. sort()", correct: true },
      { text: "C. toString()", correct: false },
      { text: "D. unshift()", correct: false },
    ],
  },
  {
    question: "To insert a JavaScript into an HTML page, which tag is used?",
    answers: [
      { text: "A. scriptJS", correct: false },
      { text: "B. script", correct: true },
      { text: "C. link", correct: false },
      { text: "D. JavaScript", correct: false },
    ],
  },
  {
    question: "Why so Java and JavaScript have similar name?",
    answers: [
      { text: "A. JavaScript is a version of Java", correct: false },
      { text: "B. JavaScript based on Java syntax", correct: false },
      { text: "C. both support OOPs", correct: false },
      { text: "D. None of the above", correct: true },
    ],
  },
];

const questionEl = document.querySelector(".question");
const answerBtns = document.querySelector(".btns");
const nextBtn = document.querySelector(".next_btn");

let currentQuestionIndex = 0;
let score = 0;
let userName = prompt("Enter your name");

const startQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
};

const showQuestion = () => {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  //   Отображаем вопрос с номером
  questionEl.innerHTML = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtns.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
};

const resetState = () => {
  nextBtn.style.display = "none";

  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
};

const selectAnswer = (e) => {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";

  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }

  Array.from(answerBtns.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }

    button.disabled = true;
  });

  nextBtn.style.display = "block";
};

const showScore = () => {
  resetState();
  questionEl.innerHTML = `${userName} your scored ${score} out of ${questions.length}`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
};

const handleNextBtn = () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
};

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});

startQuiz();
