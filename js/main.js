function $(el) { return document.querySelector(el) }

const keys = document.querySelectorAll('.key');
const btnTask = $('.btnTask');
const btnGetNewTask = $('.btnGetNewTask');
const answerPointItem = [...document.querySelectorAll('.answerPoints-item')];


//работа с пианино
keys.forEach(key => {
    key.addEventListener('click', playNote);
});

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

//определение 1 загаданной ноты
let currentAskNoteEl = document.createElement('audio')
let randomNote = Math.floor(Math.random() * dataSound.length)
currentAskNoteEl.src = dataSound[randomNote].src;
currentAskNoteEl.dataset.askedNote = dataSound[randomNote].noteName;
currentAskNoteEl.id = 'currentAskNoteEl';
document.body.append(currentAskNoteEl);

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
btnGetNewTask.addEventListener('click', refreshNote)


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