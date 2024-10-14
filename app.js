const questions = [
    {
        question: "Which is the largest animal in the world",
        answers: [
            {"text": "Lion","correct": false},
            {"text": "Elephant","correct": true},
            {"text": "Giraffe","correct": false},
            {"text": "Rabbit","correct": false}
        ]
    },
    {
        question: "Which is the smallest country in the world",
        answers: [
            {"text": "Vatican City","correct": false},
            {"text": "Bhutan","correct": true},
            {"text": "Nepal","correct": false},
            {"text": "Sri Lanka","correct": false}
        ]
    },
    {
        question: "Which is the largest desert in the world",
        answers: [
            {"text": "Kalahari","correct": false},
            {"text": "Gobi","correct": false},
            {"text": "Sahara","correct": false},
            {"text": "Antarctica","correct": true}
        ]
    },
    {
        question: "Which is the smallest continent in the world",
        answers: [
            {"text": "Asia","correct": false},
            {"text": "Australia","correct": true},
            {"text": "Arctic","correct": false},
            {"text": "Africa","correct": false}
        ]
    }
];


const qn = document.getElementById("question");
const ansbtn = document.getElementById("answer-btn");
const nextbtn = document.getElementById("next-btn");

let currqindx=0;
let score=0;

function startquiz(){
    let currqindx =0;
    let score = 0;
    nextbtn.innerHTML="next";
    showQuestion();
}

function showQuestion(){
    resetstate();
    let currquestion = questions[currqindx];
    let questionno = currqindx+1;
    qn.innerHTML= questionno + ". " + currquestion.question;

    currquestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansbtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",showResults);
    });
}

function resetstate(){
    nextbtn.style.display="none";
    while (ansbtn.firstChild) {
        ansbtn.removeChild(ansbtn.firstChild);
    }
   
}

function showResults(e){
    const selectbtn = e.target;
    const correct = selectbtn.dataset.correct === "true";
    if(correct){
        selectbtn.classList.add("correct");
        score++;
    }else{
        selectbtn.classList.add("incorrect");
    }
    Array.from(ansbtn.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbtn.style.display = "block";
}

function showscore(){
    resetstate();
    qn.innerHTML = `you scored ${score} out of ${questions.length} `;
    nextbtn.innerHTML = "Play Again";
    nextbtn.style.display ="block";
}

function handelnextbutton(){
    currqindx++;
    if(currqindx < questions.length){
        showQuestion();
    }else{
        showscore();
    }

}

nextbtn.addEventListener("click", ()=>{
    if(currqindx < questions.length){
        handelnextbutton();
    }else{
        startquiz();
    }
});

startquiz();