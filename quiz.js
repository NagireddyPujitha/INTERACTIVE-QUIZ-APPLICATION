const questions=[
    {
        question:"Which is the largest animal in the world?",
        answers:[
            {text:"Shark",correct:false},
            {text:"Elephant",correct:false},
            {text:"Blue Whale",correct:true},
            {text:"Giraffe",correct:false}
        ]
    },
    {
        question:"Which is the smallest continent in the world?",
        answers:[
            {text:"Asia",correct:false},
            {text:"Australlia",correct:true},
            {text:"Europe",correct:false},
            {text:"Africa",correct:false}
        ]
    },
    {
        question:"Which is not a planet?",
        answers:[
            {text:"Earth",correct:false},
            {text:"Mars",correct:false},
            {text:"Satrun",correct:false},
            {text:"Pluto",correct:true}
        ]
    },
    {
        question:"Which country is called as The land of spices?",
        answers:[
            {text:"India",correct:true},
            {text:"Britain",correct:false},
            {text:"Singapore",correct:false},
            {text:"Pakistan",correct:false}
        ]
    },
    {
        question:"How many continents are there on Earth?",
        answers:[
            {text:"3",correct:false},
            {text:"9",correct:false},
            {text:"7",correct:true},
            {text:"8",correct:false}
        ]
    }
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz()
{
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}


function showQuestion()
{
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;
    currentQuestion.answers.forEach(answer=>
    {
        const button =document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    }
    );
}
function resetState()
{
    nextButton.style.display="none";
    while(answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e)
{
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>
    {
        if(button.dataset.correct==="true")
        {
            button.classList.add("correct");
        }
        button.disabled=true;
    }
    );
    nextButton.style.display="block";
}
nextButton.addEventListener("click",()=>
{
    if(currentQuestionIndex<questions.length)
    {
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
function handleNextButton()
{
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length)
    {
        showQuestion();
    }
    else{
        showScore();
    }
}
function showScore()
{
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
startQuiz();