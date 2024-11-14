const quizData = [
    {
      question: "What is the capital of France?",
      choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
      correct: 2
    },
    {
      question: "What is 2 + 2?",
      choices: ["3", "4", "5", "6"],
      correct: 1
    },
    {
      question: "What is the capital of Japan?",
      choices: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
      correct: 1
    },
    {
      question: "Which language is primarily used for web development?",
      choices: ["Python", "Java", "C++", "JavaScript"],
      correct: 3
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionEl = document.getElementById("question");
  const choicesEl = Array.from(document.getElementsByClassName("choice"));
  const nextButton = document.getElementById("next-button");
  const progressBarFill = document.createElement("div");
  
  progressBarFill.classList.add("progress-bar-fill");
  document.getElementById("progress-bar").appendChild(progressBarFill);
  
  function loadQuestion() {
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    choicesEl.forEach((button, index) => {
      button.textContent = currentQuestion.choices[index];
    });
    updateProgressBar();
  }
  
  function resetState() {
    choicesEl.forEach(button => {
      button.classList.remove("correct", "incorrect");
      button.disabled = false;
    });
    nextButton.style.display = "none";
  }
  
  function selectAnswer(index) {
    const currentQuestion = quizData[currentQuestionIndex];
    if (index === currentQuestion.correct) {
      choicesEl[index].classList.add("correct");
      score++;
    } else {
      choicesEl[index].classList.add("incorrect");
      choicesEl[currentQuestion.correct].classList.add("correct");
    }
    choicesEl.forEach(button => (button.disabled = true));
    nextButton.style.display = "inline-block";
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }
  
  function showResults() {
    questionEl.textContent = `Quiz Completed! Your score: ${score}/${quizData.length}`;
    choicesEl.forEach(button => (button.style.display = "none"));
    nextButton.style.display = "none";
    progressBarFill.style.width = "100%";
  }
  
  function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBarFill.style.width = progress + "%";
  }
  
  loadQuestion();
  