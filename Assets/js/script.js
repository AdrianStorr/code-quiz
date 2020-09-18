// Testing
// Array of objects
const quiz = [
    {
        q: 'Commonly used data types DO NOT include:',
        options: ['srtings', 'Boolean', 'Alert', 'Numbers'],
        answer: 2
    },
    {
        q: 'The condition in an if/ else statement is enclosed whithin___',
        options: ['Quotes', 'Curly Brackets', 'Parenthesis', 'Square Brackets'],
        answer: 2
    },
    {
        q: 'Arrays in javascript can be used to store___',
        options: ['number of strings', 'other arrays', 'boolean', 'all of the above'],
        answer: 3
    },
    {
        q: 'String values must be stored within ___when being assigned to variables',
        options: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
        answer: 2
    },
    {
        q: 'A very useful tool used during developing and debugging for printing contents to the debugger is:',
        options: ['javascript', 'terminal-bash', 'for loop', 'console.log'],
        answer: 3
    },
]




const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator")
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");



let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers= 0;
let attempt = 0;

var totalWorkSeconds = 0;
var totalRestSeconds = 0;
var secondsElasped = 0;
var interval;

// push question in availableQuestion Array
function setAvailableQuestions() {
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i])
    }

}
// set question number and options
function getNewQuestion() {
    // set question number
    questionNumber.innerHTML = "Question" + (questionCounter + 1) + " of " + quiz.length;

    // set question text
    // get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    // get the position of 'questionIndex'from the availableQuestion array
    const index1 = availableQuestions.indexOf(questionIndex);
    // remove the question index from the availableQustion array so that the question does not repeat
    availableQuestions.splice(index1, 1);

    // set options
    // get length of options
    const optionLen = currentQuestion.options.length
    // push options  into availableOptions array
    for (let i = 0; i < optionLen; i++) {
        availableOptions.push(i)
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.2;
    // create option in html
    for (let i = 0; i < optionLen; i++) {
        // random option
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        // get the position of option index from the availabeOption array
        const index2 = availableOptions.indexOf(optionIndex);
        // remove the optionIndex from the availableOptions so the option do not repeat
        availableOptions.splice(index2, 1)
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.2;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick", "getResult(this)");
    }

    questionCounter++

}
// get the result of current attempts
function getResult(element) {
    const id = parseInt(element.id);
    // get answer by comparing click option

    if (id === currentQuestion.answer) {
        //   set the  green color for correct answer
        element.classList.add("correct");
        updateAnswerIndicator("correct");
        correctAnswers++;
        console.log("correct:" + correctAnswers)
    }
    //   set red color for wrong answer
    else {
        element.classList.add("wrong");
         updateAnswerIndicator("wrong")
    }
        //   if answer is incorrect then show correct option by adding green color
        const optionLen = optionContainer.children.length;
        for (let i = 0; i < optionLen; i++) {
            if (parseInt(optionContainer.children[i].id === currentQuestion.answer)){


                optionContainer.children[i].classList.add("correct");
            }
        }
    
  attempt++;
    unclickableOptions();
 }
// make all options unclickable once user selects option restricting user from making 2 selections
function unclickableOptions() {
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered");
    }
}
function answersIndicator(){
      answersIndicatorContainer.innerHTML= '';
      const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        const indicator = document.createElement("div");
        console.log(answersIndicatorContainer)
        console.log(indicator)
        answersIndicatorContainer.appendChild(indicator);
    }
}
function updateAnswerIndicator(markType) {
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
}

function next() {
    if (questionCounter === quiz.length) {
        console.log("quiz over");
        quizOver();
    }
    else {
        getNewQuestion();
    }
}
 function quizOver() {
//    hide quiz quizBox
   quizBox.classList.add("hide");
//    show result box
   resultBox.classList.remove("hide");
   quizResult();
 }
//  get quiz result
function quizResult(){
  resultBox.querySelector(".total-question").innerHTML= quiz.length;
  resultBox.querySelector(".total-attempt").innerHTML= attempt;
  resultBox.querySelector(".total-correct").innerHTML= correctAnswers;
  resultBox.querySelector(".total-wrong").innerHTML= attempt-correctAnswers;
  resultBox.querySelector(".time")
  resultBox.querySelector(".total-score").innerHTML= correctAnswers + " / " + quiz.length;
}

function resetQuiz() {
     questionCounter = 0;
     correctAnswers= 0;
     attempt = 0;
       
}

function tryAgainQuiz(){
    // hide result box
    resultBox.classList.add("hide");
    // show the quiz box
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}
// ###STARTING POINT###

function startQuiz() {
    // hide home box
    homeBox.classList.add("hide");
    // show quiz box
    quizBox.classList.remove("hide");
    // set all questions in availableQuestions array
    setAvailableQuestions();
    // then call getQuestion()function
    getNewQuestion();
    answersIndicator();
}


