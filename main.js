const data = [{
        id: 1,
        question: 'Select the answer for : 3*5',
        options: [12, 13, 14, 15],
        correctAnswer: 15
    },
    {
        id: 2,
        question: 'Select the answer for : 7*8',
        options: [54, 56, 78, 87],
        correctAnswer: 56
    },
    {
        id: 3,
        question: 'Select the answer for : 4*6',
        options: [24, 26, 28, 20],
        correctAnswer: 24
    },
    {
        id: 4,
        question: 'Select the answer for : 5*9',
        options: [35, 70, 44, 45],
        correctAnswer: 45
    },
    {
        id: 2,
        question: 'Select the answer for : 8*8',
        options: [54, 64, 78, 79],
        correctAnswer: 64
    }

]


var questionArea = document.querySelector('#question')
var optionArea = document.querySelector('#option')
var optionChecked = document.getElementsByName('quiz')
var quizArea = document.querySelector('#quiz')

var btnNext = document.querySelector('#next')
var btnPrev = document.querySelector('#prev')
var btnStartOver = document.querySelector('#start')

var indexQuestion = 0;
var arrayOption = []
var arrayChecked = []
var tempOption = ''
var finalResult = 0



function enableButton(index, value, btn) {
    if (index === value) {
        btn.disabled = true;
    } else {
        btn.disabled = false;
    }
}


function render(index) {
    enableButton(index, 0, btnPrev)

    questionArea.textContent = data[index].question
    for (var i = 0; i < 4; i++) {
        tempOption = `<input type="radio" id="${i}" name="quiz" value="${data[index].options[i]}">
                      <label for="${data[index].options[i]}">${data[index].options[i]}</label>
                      <br>`
        arrayOption.push(tempOption)
    }
    optionArea.innerHTML = arrayOption.join("")
}

btnNext.onclick = function(e) {
    //Get elements radio checked
    arrayOption = []
    if (indexQuestion <= 3) {
        for (i = 0; i < optionChecked.length; i++) {
            if (optionChecked[i].checked) {
                arrayChecked[indexQuestion] = i
            }
        }

        indexQuestion = indexQuestion + 1

        render(indexQuestion)
        if (arrayChecked.length > indexQuestion) {
            optionChecked[arrayChecked[indexQuestion]].setAttribute('checked', 'checked')
        }
    } else {
        for (i = 0; i < optionChecked.length; i++) {
            if (optionChecked[i].checked) {
                arrayChecked[indexQuestion] = i
            }
        }

        arrayChecked.map(function(item, index) {
            if (data[index].options[item] === data[index].correctAnswer) {
                finalResult += 1
            }
        })

        quizArea.innerHTML = `<div>
                                Final your Score is ${finalResult} out of 5 !!
                            </div>`
        btnPrev.disabled = true;
        btnNext.disabled = true;
        btnStartOver.disabled = false;
    }

}

btnPrev.onclick = function(e) {
    indexQuestion = indexQuestion - 1
    arrayOption = []
    render(indexQuestion)

    optionChecked[arrayChecked[indexQuestion]].setAttribute('checked', 'checked')

}

btnStartOver.onclick = function(e) {
    reload = location.reload();
}

render(indexQuestion)


btnStartOver.disabled = true;