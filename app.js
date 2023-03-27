const gameBoard = document.querySelector('#gameboard')
const infoDisplay = document.querySelector('#info')
const body = document.getElementsByTagName('body')
const startCells = [
    "", "", "", "", "", "", "", "", "", 
]
let go = 'circle'
infoDisplay.textContent = "Circle goes first"


function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div')
        cellElement.classList.add('square')
        cellElement.id = index
        cellElement.addEventListener('click', addGo)
        gameBoard.append(cellElement)
    })

}

createBoard();


function addGo(e) {
    const goDisplay = document.createElement('div')
    // goDisplay.classList.add('circle')
    // goDisplay.classList.add('cross')
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    e.target.removeEventListener('click', addGo)
    go = go === 'circle' ? 'cross' : 'circle'
    infoDisplay.textContent = "It is now " + go + "'s turn."
    document.body.className = go === 'cross' ? 'darkmode' : 'lightmode'
    document.querySelector('#info').className = go === 'cross' ? 'darkmode-text' : 'lightmode-text'
    document.getElementById('gameboard').className = go === 'cross' ? 'darkmode-border' : 'lightmode-border'

    const h1 = document.getElementsByTagName('h1')[0];
    h1.className = go === 'cross' ? 'darkmode-text' : 'lightmode-text';

    checkScore()
}

function checkScore() {
    const allSquares = document.querySelectorAll(".square")
    // console.log(allSquares)
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    winningCombos.forEach(array => {
        const circleWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains('circle'))

        if (circleWins) {
            infoDisplay.textContent = "Circle wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    })

    winningCombos.forEach(array => {
        const crossWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains('cross'))

        if (crossWins) {
            infoDisplay.textContent = "Cross wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    })

    
}