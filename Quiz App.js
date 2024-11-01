const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Lion", correct:false},
            {text: "Giraffe", correct:false},
            {text: "Elephant", correct:false},
            {text: "Blue Whale", correct:true}
        ]
    },
    {
        question: "Who is not a marvel hero?",
        answers: [
            {text: "Iron-Man", correct:false},
            {text: "Batman", correct:true},
            {text: "Thor", correct:false},
            {text: "Captain America", correct:false}
        ]
    },
    {
        question: "How many minutes are there are in a day?",
        answers: [
            {text: "1440 minutes", correct:true},
            {text: "1000 minutes", correct:false},
            {text: "1900 minutes", correct:false},
            {text: "1356 minutes", correct:false}
        ]
    },
    {
        question: "How many months are there in an year?",
        answers: [
            {text: "12 months", correct:true},
            {text: "10 months", correct:false},
            {text: "11 months", correct:false},
            {text: "9 months", correct:false}
        ]
    },
    {
        question: "How many infinity stones are there in marvel universe?",
        answers: [
            {text: "10", correct:false},
            {text: "5", correct:false},
            {text: "4", correct:false},
            {text: "6", correct:true}
        ]
    },
    {
        question: "Real name of actor playing 'Thor' in marvel universe?",
        answers: [
            {text: "Robert Downey Jr.", correct:false},
            {text: "Chris Pratt", correct:false},
            {text: "Chris Hemsworth", correct:true},
            {text: "Chris Evans", correct:false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();