# Project 1: 'Pupper'

## Introduction

I chose to build minesweeper for my project 1 at General Assembly Software Engineering Bootcamp. it is a very fun game and i had so much building it

## Contents
* [Introduction](#Introduction)
* [Contents](#Contents)
* [Project Brief](#Project-Brief)
* [Technologies](#Technologies)
* [Grid Design](#Grid-Design)
* [Game Mechanics](#Game-Mechanics)
  * [clicking squares](#clicking-squares)
  * [Losing](#Loss-Logic)
  * [Winning](#Win-Logic)
* [In Conclusion](#In-Conclusion)


## Project Brief

The idea of minesweeper is to try clearing all the squares without clicking any mines
guide a family of dogs across a zombie highway, and live train tracks to their homes at the top of the screen.

## Technologies
* HTML
* CSS
* JavaScript
* Git

![board for minesweeper](minesweeper-main/assets/Screenshot%202025-07-16%20104156.png)

## Grid Design

I started by creating the main container div using HTML, then used a javaScript function to loop through the number of grids i chose and creat a div for every one of them
i made the hight and width of the board change depending on the number and size of grids, so i can easly make different levels without having to change it for every size

# Game Mechanics


## Adding the bombs 
The first thing that happes when loading the game is the generating the bombsin random squares on the board 
to do that i used Math.floor and Math.random to get a random number, then add a class 'mine' to the cell at that spot.

## clicking squares

I added an event listener to every div i created so when it is clicked it does one of three things, it either shows the number of bombs next it, ends the game if it is a bomb, or when it does not have any bombs next to it, it uses a recursive function that get passed to each next square and keeps unlocking them until it hits a bomb, below is the funcrion

```javascript
function unlock(neighbors) {
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
```
## Loss Logic
When the player clickes a cell that has the class 'mine' a losing message get printed and 'GameOver' get set to true to stop the game from runing. The user can then click 'restart' to restart the game.

## Win Logic
I put all the cells that are not bombs into an array, then on every click it checks if all the elemnet on that array contain class 'unlocked' or not, if yes it prints a winning message and set gameOver to true.

## Wins and Blockers
#### Wins include:
* Recursive functions
  * This was my first time learning about and using recursive functions

## Additional features
* More Levels

## In Conclusion
All in all, this was not really easy but i had so much fun and learned a lot working on it, and i might work on adding more levels on my own time.   