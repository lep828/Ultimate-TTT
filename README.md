# Ultimate Tic Tac Toe
Ultimate Tic Tac Toe

## What is it?
Like the original Tic-Tac-Toe, Player 1 is represented by X and Player 2 is represented by O. To start the game, Player 1 places an X on any one of the 81 empty squares, and then players alternate turns.

However, after the initial move, players must play the board that mirrors the square from the previous player. If the next move is to a board that has already been won, then that player may choose an open square on any board for that turn. You win boards as usual, but you win the game when you win three boards together (across rows, columns or diagnols). 

For a more indepth explanation of how to play click [here](https://mathwithbaddrawings.com/2013/06/16/ultimate-tic-tac-toe/)

## Technologies used
- AngularJS v1.5.8
- Node.js
- Express.js
- Grunt
- Bower

I decided to use AngularJS v1.5.8 because I'm more familiar with it compared to Angular-2, I'm in the process of learning it but I will admit I'm not amazing at it right now. I'm using Grunt as a task runner to compile my SCSS and minify my code; I know there are other alternatives such as Webpack and Browserify which are more commonly used however I decided to use Grunt because I haven't had time to experiment with the them and so I wanted to stick with something more comfortable for the moment.

## Possible updates
- In the future I want to add a computer for the opponent as an option because right now the game requires two people to be playing on the same device, which isn't always available.
- Change AngularJS v1.5.8 to Angular-2