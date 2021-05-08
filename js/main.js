import dataSound from './dataSound.js'


const keys = document.querySelectorAll('.key');
const btnTask = $('.btnTask');
const btnGetNewTask = $('.btnGetNewTask');
const answerPointItem = [...document.querySelectorAll('.answerPoints-item')];
const timerAlert = $('.timerAlert')

//работа с пианино
keys.forEach(key => { key.addEventListener('click', playNote)});

//определение 1 загаданной ноты
firstNote();

//таймер для Саске
const timerId = setInterval(showTimerAlert, 300000);

btnGetNewTask.addEventListener('click', refreshNote)
timerAlert.addEventListener('click', hideTimerAlert)

//сыграть загаданный звук еще раз
btnTask.addEventListener('click', () => {
    let currentAskNote = document.getElementById('currentAskNoteEl');
    currentAskNote.currentTime = 0.5;
    currentAskNote.play();
})

//проверка загаданной ноты
answerPointItem.forEach(item => {
    item.addEventListener('click', (evt) => {
        let currentChosenNote = evt.target.innerText;
        let currentAskNote = document.getElementById('currentAskNoteEl');
        if (currentChosenNote == currentAskNote.dataset.askedNote) {
            currentAskNote.currentTime = 0.5;
            currentAskNote.play();
            alert("Верно")
            refreshNote()
        }
    })
})

//----------------------------------------------------------------------------------------------------

function $(el) { return document.querySelector(el) }

//работа с загадыванием нового звука
function refreshNote() {
    let currentAskNoteEl = document.createElement('audio')
    let randomNote = Math.floor(Math.random() * dataSound.length)
    currentAskNoteEl.src = dataSound[randomNote].src;
    currentAskNoteEl.id = 'currentAskNoteEl';
    currentAskNoteEl.dataset.askedNote = dataSound[randomNote].noteName;
    $('#currentAskNoteEl').replaceWith(currentAskNoteEl)
    let currentAskNote = document.getElementById('currentAskNoteEl');
    currentAskNote.currentTime = 0.5;
    currentAskNote.play();
}

function playNote(e) {
    let key = e.target;
    let note = document.getElementById(key.dataset.note);
    key.classList.add('active');
    note.currentTime = 0.5;
    note.play();
    note.addEventListener('ended', () => {
        key.classList.remove('active');
    });
}

function firstNote() {
    let currentAskNoteEl = document.createElement('audio')
    let randomNote = Math.floor(Math.random() * dataSound.length)
    currentAskNoteEl.src = dataSound[randomNote].src;
    currentAskNoteEl.dataset.askedNote = dataSound[randomNote].noteName;
    currentAskNoteEl.id = 'currentAskNoteEl';
    document.body.append(currentAskNoteEl);
}

function showTimerAlert() {
    timerAlert.classList.add('timerAlert-v')
}
function hideTimerAlert() {
    timerAlert.classList.remove('timerAlert-v')
}