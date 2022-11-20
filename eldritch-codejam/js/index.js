import cardsDataGreen from '/data/mythicCards/green/index.js';
import cardsDataBrown from '/data/mythicCards/brown/index.js';
import cardsDataBlue from '/data/mythicCards/blue/index.js';
let greenCardsData;
let brownCardsData;
let blueCardsData;

function importCards() {
    greenCardsData = cardsDataGreen;
    brownCardsData = cardsDataBrown;
    blueCardsData = cardsDataBlue;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function buildEasyDecks() {
    // собрать колоды для легкого уровня
    greenCardsData = greenCardsData.filter((item) => item.difficulty !== 'hard');
    brownCardsData = brownCardsData.filter((item) => item.difficulty !== 'hard');
    blueCardsData = blueCardsData.filter((item) => item.difficulty !== 'hard');
    pullDot();
    shuffleDecks();
    deleteExtraCards();
    buildInStages();
    hideElements();
}

function buildHardDecks() {
    // собрать колоды для сложного уровня
    greenCardsData = greenCardsData.filter((item) => item.difficulty !== 'easy');
    brownCardsData = brownCardsData.filter((item) => item.difficulty !== 'easy');
    blueCardsData = blueCardsData.filter((item) => item.difficulty !== 'easy');
    pullDot();
    shuffleDecks();
    deleteExtraCards();
    buildInStages();
    hideElements();
}

let greenTemp;
let brownTemp;
let blueTemp;
function buildVeryEasyDecks() {
    greenTemp = '';
    brownTemp = '';
    blueTemp = '';
    greenTemp = greenCardsData.filter((item) => item.difficulty === 'easy');
    brownTemp = brownCardsData.filter((item) => item.difficulty === 'easy');
    blueTemp = blueCardsData.filter((item) => item.difficulty === 'easy');
    addNormalCards();
}

function buildVeryHardDecks() {
    greenTemp = '';
    brownTemp = '';
    blueTemp = '';
    greenTemp = greenCardsData.filter((item) => item.difficulty === 'hard');
    brownTemp = brownCardsData.filter((item) => item.difficulty === 'hard');
    blueTemp = blueCardsData.filter((item) => item.difficulty === 'hard');
    addNormalCards();
}

function addNormalCards() {
    pullDot();
    if (greenTemp.length < greenCount) { //если зеленых карт не хватило на игру,то добавим карты обычной сложности
        shuffleDecks();
        for (let i = 0; i < greenCardsData.length; i++) {
            if (greenCardsData[i].difficulty === 'normal') {
                greenTemp.push(greenCardsData[i]);
            }
        }
    }
    greenCardsData = greenTemp;
    if (brownTemp.length < brownCount) {
        shuffleDecks();
        for (let i = 0; i < brownCardsData.length; i++) {
            if (brownCardsData[i].difficulty === 'normal') {
                brownTemp.push(brownCardsData[i]);
            }
        }
    }
    brownCardsData = brownTemp;
    if (blueTemp.length < blueCount) {
        shuffleDecks();
        for (let i = 0; i < blueCardsData.length; i++) {
            if (blueCardsData[i].difficulty === 'normal') {
                blueTemp.push(blueCardsData[i]);
            }
        }
    }
    blueCardsData = blueTemp;
    deleteExtraCards();
    shuffleDecks();
    buildInStages();
    hideElements();
}

function shuffleDecks() {
    // перемешать колоды
    greenCardsData = shuffle(greenCardsData);
    brownCardsData = shuffle(brownCardsData);
    blueCardsData = shuffle(blueCardsData);
}

// по нажатию на Древнего собирать колоду
import ancientsData from '/data/ancients.js';
const dotGreen = document.querySelectorAll('.green');
const dotBrown = document.querySelectorAll('.brown');
const dotBlue = document.querySelectorAll('.blue');
let activeAncientIndex = 0;  // индекс активного Древнего
Array.from(ancientCard).forEach(function (picture) {
    picture.addEventListener('click', function (b) {
        hideElements();
        importCards();
        activeAncientIndex = Number(b.target.id);
    })
});

function pullDot() {
    dotGreen[0].textContent = `${ancientsData[activeAncientIndex].firstStage.greenCards}`;
    dotGreen[1].textContent = `${ancientsData[activeAncientIndex].secondStage.greenCards}`;
    dotGreen[2].textContent = `${ancientsData[activeAncientIndex].thirdStage.greenCards}`;
    dotBrown[0].textContent = `${ancientsData[activeAncientIndex].firstStage.brownCards}`;
    dotBrown[1].textContent = `${ancientsData[activeAncientIndex].secondStage.brownCards}`;
    dotBrown[2].textContent = `${ancientsData[activeAncientIndex].thirdStage.brownCards}`;
    dotBlue[0].textContent = `${ancientsData[activeAncientIndex].firstStage.blueCards}`;
    dotBlue[1].textContent = `${ancientsData[activeAncientIndex].secondStage.blueCards}`;
    dotBlue[2].textContent = `${ancientsData[activeAncientIndex].thirdStage.blueCards}`;
    countDot();
}

let greenCount;
let brownCount;
let blueCount;
function countDot() {
    greenCount = 0;
    dotGreen.forEach(element => {
        greenCount += Number(element.textContent);
    });
    brownCount = 0;
    dotBrown.forEach(element => {
        brownCount += Number(element.textContent);
    });
    blueCount = 0;
    dotBlue.forEach(element => {
        blueCount += Number(element.textContent);
    });
}

function deleteExtraCards() {
    // удалить лишние карты до необходимой колоды мифов и перемешать каждую колоду
    greenCardsData = greenCardsData.slice(0, greenCount);
    brownCardsData = brownCardsData.slice(0, brownCount);
    blueCardsData = blueCardsData.slice(0, blueCount);
    shuffleDecks();
}

// объединить все колоды в одну
let readyDeck;
function mergeDecks() {
    readyDeck = [];
    readyDeck = stageThird.concat(stageSecond, stageOne);
}

// сформировать колоды по этапам    
let stageOne;
let stageSecond;
let stageThird;
function buildInStages() {
    stageOne = [];
    stageSecond = [];
    stageThird = [];
    stageThird.push(greenCardsData.slice(0, Number(dotGreen[2].textContent)), brownCardsData.slice(0, Number(dotBrown[2].textContent)), blueCardsData.slice(0, Number(dotBlue[2].textContent)));
    stageThird = [shuffle([].concat.apply([], stageThird))];
    greenCardsData = greenCardsData.slice(Number(dotGreen[2].textContent)); //удалить из зеленой колоды карты, которые уже лежат в этапе
    brownCardsData = brownCardsData.slice(Number(dotBrown[2].textContent));
    blueCardsData = blueCardsData.slice(Number(dotBlue[2].textContent));

    stageSecond.push(greenCardsData.slice(0, Number(dotGreen[1].textContent)), brownCardsData.slice(0, Number(dotBrown[1].textContent)), blueCardsData.slice(0, Number(dotBlue[1].textContent)));
    stageSecond = [shuffle([].concat.apply([], stageSecond))];
    greenCardsData = greenCardsData.slice(Number(dotGreen[1].textContent));
    brownCardsData = brownCardsData.slice(Number(dotBrown[1].textContent));
    blueCardsData = blueCardsData.slice(Number(dotBlue[1].textContent));

    stageOne.push(greenCardsData.slice(0, Number(dotGreen[0].textContent)), brownCardsData.slice(0, Number(dotBrown[0].textContent)), blueCardsData.slice(0, Number(dotBlue[0].textContent)));
    stageOne = [shuffle([].concat.apply([], stageOne))];
    greenCardsData = greenCardsData.slice(Number(dotGreen[0].textContent));
    brownCardsData = brownCardsData.slice(Number(dotBrown[0].textContent));
    blueCardsData = blueCardsData.slice(Number(dotBlue[0].textContent));
    mergeDecks(); //сложить колоды в одну стопку (первая сверху)
}

// вывод на экран актуальной карты
const lastCard = document.querySelector('.last-card');
function showCard() {
    // динамичный трекер
    let link = '';
    let dotsInOrder = [Array.from(dotGreen)].concat([Array.from(dotBrown)], [Array.from(dotBlue)]);
    dotsInOrder = [].concat.apply([], dotsInOrder);
    let curCard = readyDeck[readyDeck.length - 1];
    for (let i = 0; i < dotsInOrder.length; i++) {
        let colorFromClassName = dotsInOrder[i].className.split(' ').pop();
        if (colorFromClassName === curCard.color) {
            if (Number(dotsInOrder[i].textContent) > 0) {
                dotsInOrder[i].textContent = String(Number(dotsInOrder[i].textContent) - 1);
                break;
            }
        }
    }
    link = curCard.cardFace;
    lastCard.style.backgroundImage = 'url(' + link + ')';
}

// по клику на перевернутую колоду вытягивать по одной карте
function popOneCard() {
    if (readyDeck.length > 0) {
        readyDeck = [].concat.apply([], readyDeck);
        showCard();
        readyDeck.pop();
    }
    else {
        lastCard.style.backgroundImage = '';
        deck.style.backgroundImage = '';
    }
}
deck.addEventListener('click', popOneCard);

// выделить активную сложность
function chooseDiff() {
    Array.from(difficulty).forEach(function (element) {
        element.addEventListener('click', function (event) {
            hideElements();
            importCards();
            if (element.textContent === 'Низкая') {
                buildEasyDecks();
            } else if (element.textContent === 'Высокая') {
                buildHardDecks();
            } else if (element.textContent === 'Очень высокая') {
                buildVeryHardDecks();
            } else if (element.textContent === 'Очень низкая') {
                buildVeryEasyDecks();
            } else {
                pullDot();
                buildInStages();
                hideElements();
            }
        })
    });
}
chooseDiff();
