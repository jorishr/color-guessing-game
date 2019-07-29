/* 
    GAME LOGIC
    
    - generate an array of rgb color strings
    - color-fill the squares (easy/medium/hard mode: 3-6-9)  
    - pick a random game color out of the colors array
    - listen for click events on the squares
    - if the clicked square's color matches the game color -> success styling
    - else -> square disappears
    - reset/play again button -> reset colors array, game color and styles
    - switch between easy/medium and hard mode -> hide/unhide squares, arr of 3/6/9
*/

//  select dom elements
const   headline    = document.querySelector('h2'),
        sqrs        = document.querySelectorAll('.square'),
        dsplResult  = document.querySelector('.result__text'),
        playBtn     = document.querySelector('.playBtn'),
        modeBtns    = document.querySelectorAll('.modeBtn');

//  game starter code: default game mode = medium, 6 squares
let gameMode;
function gameInit() {
    gameMode = 6;
    reset();
    setupSquares();
    gameModeChanges();
};
gameInit();

//  setup squares events listeners
function setupSquares(){
    for(let i = 0; i < sqrs.length; i++){
        sqrs[i].addEventListener('click', function() {
            let bgColor = this.style.backgroundColor;
            if (bgColor === gameColor){
                successStyles(gameColor);
            } else {
                sqrs[i].style.opacity = 0;
                dsplResult.textContent = 'Wrong! Try again.';
                dsplResult.classList.remove('success');
                dsplResult.classList.add('error');
            };
        });
    };
};

//  correct guess result action, pass in the game color variable
function successStyles(gameColor) {
    for(let i = 0; i < sqrs.length; i++){
        sqrs[i].style.backgroundColor = gameColor;
        sqrs[i].style.opacity = 1;
        headline.style.color = gameColor;
        headline.textContent = `This color is ${gameColor}`
        dsplResult.textContent = 'Good pick!';
        dsplResult.classList.remove('error');
        dsplResult.classList.add('success');
        playBtn.textContent = 'Play again';
    };
};

//  reset game
playBtn.addEventListener('click', function() {
    reset();
});

function reset() {
    colors = colorArr(gameMode);
    gameColor = pickGameColor();
    headline.style.color = '#99AAAB';
    headline.textContent = `Which color is ${gameColor}?`;
    dsplResult.textContent = '';
    fillSqrs();
};

//  fill the squares with colors from array, hide squares
function fillSqrs() {
    for(let i = 0; i < sqrs.length; i++){
        sqrs[i].style.backgroundColor = colors[i];
        sqrs[i].style.opacity = 1;
        if (gameMode === 3 && i > 2) {
            sqrs[i].style.display = 'none';
        };
        if(gameMode === 6 && i > 2 && i < 6) {
            sqrs[i].style.display = 'block';
        }
        if(gameMode === 6 && i > 5) {
            sqrs[i].style.display = 'none';
        }
        if(gameMode === 9 && i > 2) {
            sqrs[i].style.display = 'block';
        }
    };
};

//  game mode changes
function gameModeChanges() {
    for(let i = 0; i < modeBtns.length; i++){
        modeBtns[i].addEventListener('click', function() {
            for(let x = 0; x < modeBtns.length; x++){
                modeBtns[x].classList.remove('selected');
            };
            this.classList.add('selected');

            if(this.textContent === 'Easy'){
                gameMode = 3;
            } else if (this.textContent === 'Medium') { gameMode = 6;
            } else { gameMode = 9; };

            reset();
            fillSqrs();
        });
    };
};

//  create an array of random rgb colors
function generateColor(){
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let color = `rgb(${red}, ${green}, ${blue})`;
    return color; 
};

function colorArr(num){
    let arr = [];
    for(let i = 0; i < num; i++){
        let color = generateColor();
        arr.push(color);
    };
    return arr;
};

//  pick random game color from the color array
function pickGameColor() {
    let num = Math.floor(Math.random() * colors.length);
    return colors[num];
};