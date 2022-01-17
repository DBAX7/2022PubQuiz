const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []



let questions = [
    {
        question: 'If all goes to plan, what will Elizabeth Windsor celebrate in February?',
        choice1: 'Her Birthday',
        choice2: 'Platinum Jubilee',
        choice3: 'Her Estranged Grandsons Anniversary',
        choice4: 'Golden Jubilee',
        answer: 2,
    },
    {
        question:
            "what is 2022 written in Roman numerals?",
        choice1: "MMXXII",
        choice2: "2022",
        choice3: "MMXXXII",
        choice4: "LXIX",
        answer: 1,
    },
    {
        question: "2022 is the United Nation's International Year of...?",
        choice1: "Rebuilding and Hope",
        choice2: "The Future Generations",
        choice3: "Artisanal Fisheries And Aquaculture ",
        choice4: "Work Meetings",
        answer: 3,
    },
    {
        question: "Where will the Eurovision Song Contest be hosted?",
        choice1: "Rome",
        choice2: "Florence",
        choice3: "Turin",
        choice4: "Weatherspoons",
        answer: 3,
    },
    {
        question: "In June 2022, which Irish county is due to be completely detached from the island and Jettisoned out to sea?",
        choice1: "Cork",
        choice2: "Galway",
        choice3: "Louth",
        choice4: "What do you mean? No Irish country is set to detach and join the Jettisoned sea in 2022",
        answer: 4,
    }

]


const SCORE_POINTS = 1
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}



startGame()