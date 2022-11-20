const deck = document.querySelector('.deck');
const currentState = document.querySelector('.current-state');
const lastCard = document.querySelector('.last-card');

// выделить активного Древнего
let ancientCard = document.querySelectorAll('.ancient-card');
[].slice.call(ancientCard).forEach(function (element) {
    element.addEventListener('click', function (event) {
        if (activeCard = document.querySelector(".ancient-card.active")) {
            activeCard.classList.remove("active");
        };
        event.target.classList.add('active');
    });
});

// по клику на Древнего показать выбор сложности
const difficultyContainer = document.querySelector('.difficulty-container');
ancientCard.forEach(b => b.addEventListener('click', () => {
    difficultyContainer.style.visibility = 'visible';
}));

// по клику на сложность показать кнопку Замешать колоду
function hideElements() {
    currentState.style.visibility = "hidden";
    lastCard.style.visibility = "hidden";
    deck.style.visibility = "hidden";
}
function showElements() {
    currentState.style.visibility = "visible";
    lastCard.style.visibility = "visible";
    deck.style.visibility = "visible";
}
const shuffleBtn = document.querySelector('.shuffle-button');
const difficulty = document.querySelectorAll('.difficulty');
difficulty.forEach(b => b.addEventListener('click', () => {
    shuffleBtn.style.visibility = 'visible';
    hideElements();
}));

// по клику на Замешать колоду – скрыть ее и показать трекер и колоду
function showState() {
    showElements();
    shuffleBtn.style.visibility = "hidden";
    lastCard.style.backgroundImage = '';
    deck.style.backgroundImage = "url(assets/mythicCardBackground.png)";
}
shuffleBtn.addEventListener('click', showState);

// выделить активную сложность
[].slice.call(difficulty).forEach(function (element) {
    element.addEventListener('click', function (event) {
        if (element = document.querySelector(".difficulty.active")) {
            element.classList.remove("active");
        };
        event.target.classList.add('active');
    })
});
