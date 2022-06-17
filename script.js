function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

// Question prototype
Question.prototype.checkAnswer = function (answer) {
  return this.answer === answer;
};

// Quiz Constructor
function Quiz(questions) {
  this.questions = questions;
  this.score = 0;
  this.questionIndex = 0;
}

// Quiz Prototype
Quiz.prototype.getQuestion = function () {
  return this.questions[this.questionIndex];
};

// Quiz isFinish
Quiz.prototype.isFinish = function () {
  return this.questions.length === this.questionIndex;
};

// Quiz guess
Quiz.prototype.guess = function (answer) {
  var question = this.getQuestion();

  if (question.checkAnswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
};

var q1 = new Question(
  "Which of the following country won Football world Cup maximum times?",
  ["Germany", "Italy", " Argentina", "Brazil"],
  "Brazil"
);

var q2 = new Question(
  "Who among the following player scores highest number of goals in Footbal World Cup?",
  ["Jurgen Klinsmann", "Maradona", "Miroslave Klose", "Pele"],
  "Miroslave Klose"
);

var q3 = new Question(
  "Which country became the first nation to win the Football World Cup?",
  ["Uruguay", "Germany", "Argentina", "Belgium"],
  "Uruguay"
);

var q4 = new Question(
  "Who among the following scored the first goal in World Cup history?",
  ["Lucien Laurent", "Pele", "Bert Patenaude", "Johino"],
  "Lucien Laurent"
);

var q5 = new Question(
  "Which footballer has scored the most goals?",
  ["Lionel Messi", "Cristiano Ronaldo", "Karim Benzema", "Thiery Henry"],
  "Cristiano Ronaldo"
);

var questions = [q1, q2, q3, q4, q5];

// Start Quiz

var quiz = new Quiz(questions);

loadQuestion();

function loadQuestion() {
  if (quiz.isFinish()) {
    showScore();
  } else {
    var question = quiz.getQuestion();
    var choices = question.choices;

    document.querySelector("#question").textContent = question.text;

    for (var i = 0; i < choices.length; i++) {
      var element = document.querySelector("#choice" + i);
      element.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }

    showProgress();
  }
}

function guess(id, guess) {
  var btn = document.getElementById(id);
  btn.onclick = function () {
    quiz.guess(guess);
    loadQuestion();
  };
}

function showScore() {
  var html = `<h2>Score</h2><h4>${quiz.score}</h4>`;

  document.querySelector(".card-body").innerHTML = html;
}

function showProgress() {
  var totalQuestion = quiz.questions.length;
  var questionNumber = quiz.questionIndex + 1;
  var html = "Question " + questionNumber + " of " + totalQuestion;

  if (totalQuestion === questionNumber) {
    document.querySelector("#progress").innerHTML = "Quiz is Ended";
  } else {
    document.querySelector("#progress").innerHTML = html;
  }
}
