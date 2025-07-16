function init(){

//---------------------------------------------------- Cached Element References ----------------------------------------------------------\\

    const gridElem = document.querySelector('.grid');
    const messageElem = document.querySelector('#message');
    const flagBtn = document.querySelector('#flag');
    const restartBtn = document.querySelector('#restart')
    const howToPlay = document.querySelector('#howToPlay')
    const howToPlayClose = document.querySelector('#close')
    const container = document.querySelector('#model-container')

//---------------------------------------------------- Constants ----------------------------------------------------------\\

    let gridSize = 15; // 5x5 grid
    const cellSize = 35; // Size of each cell 
    const numberOfCells = gridSize * gridSize;
    const cells = []
    const numbers = []
    const check = [-gridSize - 1, -gridSize , -gridSize + 1, -1 , 1 , gridSize - 1 , gridSize , gridSize + 1]

//---------------------------------------------------- Variables ----------------------------------------------------------\\

    let numberOfMines = 45; 
    let flag = false; 
    let won = false;
    let gameOver = false;

//---------------------------------------------------- Event Listeners ----------------------------------------------------------\\

    howToPlay.addEventListener('click', () => {
        container.classList.add('show') 
    })
    howToPlayClose.addEventListener('click', () => {
        container.classList.remove('show') 
    })
    flagBtn.addEventListener('click', useFlag);
    restartBtn.addEventListener('click', function() {
        location.reload();
    });
//---------------------------------------------------- FUNCTIONS ----------------------------------------------------------\\

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
    if (flag)
        flagBtn.style.backgroundColor = 'grey';
    else
        flagBtn.style.backgroundColor = '#121524';
}

//adjusting grid size based on number/ size of cells
    gridElem.style.width = `${gridSize * cellSize}px`; 
    gridElem.style.height = `${gridSize * cellSize}px`; 

//handle click
function handelClick(event) {
    if (gameOver) return;
    if (flag) {
        event.target.classList.toggle('flagged')
        return;
    }
        if (event.target.classList.contains('flagged')) return
        // lose condition
        else {
            if (event.target.classList.contains('mine')) {
                    gameOver = true;
                    messageElem.textContent = 'You clicked a mine (•˕ •マ.ᐟ';
                    //display the bomb pic
                    document.querySelectorAll('.mine').forEach((e)=> e.style.backgroundImage = "url('assets/360_F_170082488_Tcd6GqID2P20dCg5GEv5PniLdvi036YM.jpg')")
                    return; 
            }

            event.target.classList.add('unlocked')
            const position = Number(event.target.id)
            const neighbors = nextGrids(position)
            const bombs = checkBombs(neighbors)

            if (bombs === 0) 
                unlock(neighbors)
            else 
                event.target.textContent = bombs;

            // win condition
            won = numbers.every(number => {
                return number.classList.contains('unlocked')
            }) 
            if (won){
                gameOver = true;
                messageElem.textContent = "YOU WON ദ്ദി(• ˕ •マ.ᐟ" 
            } 
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
        neighbors.forEach (n => {
        const cell = cells [n]; 

        if (cell.classList.contains('unlocked')||cell.classList.contains('flagged')) return;
        cell.classList.add('unlocked')
        const next = nextGrids(n)
        const bombs = checkBombs(next)
        if (bombs === 0)
            unlock (next)
        else 
            cell.textContent = bombs
    })
    }

function notBombs(){
    cells.forEach (x => {
        if (! x.classList.contains('mine'))
            numbers.push(x)
    })
}

createGrid();
createMines(); 
notBombs();

} document.addEventListener("DOMContentLoaded", init);
