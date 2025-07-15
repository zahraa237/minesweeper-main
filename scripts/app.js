function init(){

    const gridElem = document.querySelector('.grid');
    const messageElem = document.querySelector('#message');

    const cells = []
    const numbers = []
    const gridSize = 5; // 5x5 grid
    const check = [-gridSize - 1, -gridSize , -gridSize + 1, -1 , 1 , gridSize - 1 , gridSize , gridSize + 1]
    
    const cellSize = 50; // Size of each cell 
    const numberOfCells = gridSize * gridSize;
    const flagBtn = document.querySelector('#flag');
    const restartBtn = document.querySelector('#restart')

    // let mineCount = 0;
    let numberOfMines = 2; 
    let flag = false; 
    let gameOver = false;

    flagBtn.addEventListener('click', useFlag);
    restartBtn.addEventListener('click', function() {
        location.reload();
    });
//---------------------------------------------- FUNCTIONS ---------------------------------------------\\

//create a grid
function createGrid(){
    for (let x = 0; x < numberOfCells; x++) {
        const cell = document.createElement('div'); 
        cell.style.width = `${cellSize}px`; 
        cell.style.height = `${cellSize}px`; 
        cell.addEventListener('click', handelClick);
        
        cells.push(cell);
        gridElem.appendChild(cell); 
        cell.id = x;
    }
}

//creating mines
function createMines() {
    let mineCount = 0;
    while (mineCount < numberOfMines) { 
        let randomNumber = Math.floor(Math.random() * numberOfCells);
        const cell = cells[randomNumber];
        if (cell.classList.contains('mine')) continue //if the cell already has a mine dont count it
        cell.classList.add('mine');
        mineCount++;
    }
}

//flag button 
function useFlag(){
    flag = !flag
}

//adjusting grid size based on number/ size of cells
    gridElem.style.width = `${gridSize * cellSize}px`; 
    gridElem.style.height = `${gridSize * cellSize}px`; 

//handle click
function handelClick(event) {

    if (flag) event.target.classList.toggle ('flagged');
    else {
        if (event.target.classList.contains('mine')){
            messageElem.textContent = 'Game Over! You clicked a mine.'; //LOSE
           // document.querySelectorAll('.mine').forEach((e)=> e.style.backgroundImage = "url('assets/360_F_170082488_Tcd6GqID2P20dCg5GEv5PniLdvi036YM.jpg')")
        }
        event.target.classList.add ('unlocked')
        const position = Number(event.target.id)
        const neighbors = nextGrids(position)
        console.log(neighbors)
        const bombs = checkBombs(neighbors)
        if (bombs === 0) unlock(neighbors)
            else event.target.textContent = bombs;
    }
}

//get an array of the ids of the grids next to the clicked one
function nextGrids(num){
    let localNeighbors = []
    const place = num % gridSize
    for (let i = 0; i < check.length; i++){ 
        const checkNum = check[i]
        let newNum = Number(num) + checkNum
        if (newNum < 0 || newNum >= numberOfCells ) continue

        const newPlace = newNum % gridSize

        if (Math.abs(newPlace - place) > 1) continue
        localNeighbors.push(newNum)
    }   
    return localNeighbors;
}

//check the number of bombs next to the clicked grid
function checkBombs(neighbors){
    let numberOfBombs = 0;

    neighbors.forEach (n => {
        const cell = cells [n]; 
        if (n >= numberOfCells || n < 0) return
        if (cell && cell.classList.contains('mine')) numberOfBombs++;
    })
    return numberOfBombs
}

function unlock(neighbors){
        console.log(neighbors)
        neighbors.forEach (n => {
        const cell = cells [n]; 
        console.log(cell.classList)
        if (cell.classList.contains('unlocked')) return;
        cell.classList.add('unlocked')
            const next = nextGrids(n)
            const bombs = checkBombs(next)
            if (bombs === 0){
            unlock (next)}
            else {
                cell.textContent = bombs}
    })
    }

function restart(){

}

function notBombs(){
    cells.forEach (x => {
        if (! x.classList.contains('mine'))
            numbers.push(x)
    })
}
//winning condition
// let winning = numbers.every(number => number.classList.contains('unlocked'))
if (numbers.every(number => number.classList.contains('unlocked'))) messageElem.textContent = "YOU WON"

createGrid();
createMines(); 
notBombs();
// win();
} document.addEventListener("DOMContentLoaded", init);
