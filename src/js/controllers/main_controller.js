(function(){
  'use strict';

  angular
    .module("tictactoe")
    .controller("MainController", MainController);

  MainController.$inject = ["$state"];
  function MainController($state){
    // namespacing 'this'
    const vm = this;

    // ************************ //
    // *** Global Variables *** //
    // ************************ //

    // Game Variables
    vm.home              = true;
    vm.rules             = false;
    vm.gameOngoing       = true;
    vm.gameWon           = false;
    vm.gameDrawn         = false;
    vm.tiles             = [0,1,2,3,4,5,6,7,8];
    vm.squares           = [[0,1],[1,4],[2,9],[3,16],[4,25],[5,36],[6,49],[7,64],[8,81]];
    vm.tileWinConditions = [14,77,194, // Horizontals
                            66,93,126, // Verticals
                            83,107];   // Diagonals
    vm.gameWinConditions = [[0,1,2],[3,4,5],[6,7,8], // Horizontals
                            [0,3,6],[1,4,7],[2,5,8], // Verticals
                            [0,4,8],[2,4,6]];        // Diagonals

    // Turn counter variables
    vm.turnCounter       = 0;
    vm.player            = "x";

    // Player Variables
    vm.xMoves            = [[],[],[],[],[],[],[],[],[]];
    vm.oMoves            = [[],[],[],[],[],[],[],[],[]];
    vm.xTiles            = [];
    vm.oTiles            = [];
    vm.xWins             = [];
    vm.oWins             = [];

    // *************************** //
    // *** Viewmodel Functions *** //
    // *************************** //

    vm.getMove             = getMove;
    vm.changePage          = changePage;
    vm.resetGame           = resetGame;

    // ***************** //
    // *** Functions *** //
    // ***************** //

    // get player's move
    function getMove(tile, value, $event){
      while(vm.gameOngoing){
        const square = $event.currentTarget.classList;
        if (checkMove(square, tile)){
          if (vm.player === 'x'){
            vm.xMoves[tile].push(value);
          } else {
            vm.oMoves[tile].push(value);
          }
          square.add(vm.player);
          checkTileWin(tile);
          getPlayer();
          moveBoard(square);
        } else {
          return false;
        }
      }
    }

    // check whose turn it is
    function getPlayer(){
      vm.turnCounter++;
      // If evens then x's turn, odds then o's turn
      if (vm.turnCounter % 2 === 0){
        vm.player = 'x';
      } else {
        vm.player = 'o';
      }
    }

    // Checks if move is valid
    function checkMove(square, tile){
      // Checks if the tile is active or if the square is inactive
      if (checkTile(tile) || square.value.indexOf("inactive") !== -1) return false;
      
      // Checks if the square has been taken already
      if(square.value.indexOf("x") === -1 && square.value.indexOf("o") === -1){
        return true;
      } else {
        return false;
      }
    }

    // move board to the corresponding tile
    function moveBoard(square){
      const tiles = document.getElementsByClassName("tile");

      // Regex to find the square's index
      const regex = new RegExp("[0-9]");
      const squareIndex = parseInt(regex.exec(square[1]));

      // Checks if the corresponding tile has been won
      if (tiles[squareIndex].classList[1] !== "x" && tiles[squareIndex].classList[1] !== "o"){
        for (let i = 0; i < tiles.length; i++){
          tiles[i].classList.remove("active");
        }
        tiles[squareIndex].classList.add("active");
      } else {
        // If tile has been won, allow any other tile to be clicked
        for (let i = 0; i < tiles.length; i++){
          tiles[i].classList.add("active");
        }
        tiles[squareIndex].classList.remove("active");
      }
    }

    // Checks for a tile win
    function checkTileWin(tile){
      let total = 0;
      let array = vm.player === 'x' ? vm.xMoves[tile] : vm.oMoves[tile];

      // Loops to add all possible combinations together to check for wins
      for (let i = 0; i < array.length; i++){
        total = array[i];
        for (let j = i+1; j < array.length; j++){
          total = array[i] + array[j];
          for (let k = j+1; k < array.length; k++){
            total += array[k];

            for (let l = 0; l < vm.tileWinConditions.length; l++){
              if (total === vm.tileWinConditions[l]){
                setTile(tile);
              }
            }
          }
        }
      }
    }

    // Checks if the tile is active
    function checkTile(tileIndex){
      const tiles = document.getElementsByClassName("tile");
      const tile  = tiles[tileIndex].classList; 
      return tile[1] !== "active" ? true : false;
    }

    // Sets tile to the winner
    function setTile(tileIndex){
      const tile = document.getElementById("tile"+tileIndex);
      tile.classList.add(vm.player);
      setSquares(tile);

      // Push tile index into the winner's array;
      if (vm.player === "x"){
        vm.xWins.push(tileIndex);
        checkGameWin(vm.xWins);
      } else {
        vm.oWins.push(tileIndex);
        checkGameWin(vm.oWins);
      }
    }
    
    // Sets won squares to inactive
    function setSquares(tile){
      for (let i = 0; i < vm.squares.length; i++){
        document.getElementById(tile.id + "square" + vm.squares[i][0]).classList.add("inactive");
      }
    }

    // Checks for a game win
    function checkGameWin(array){
      for (let i = 0; i < vm.gameWinConditions.length; i++){
        if (array.indexOf(vm.gameWinConditions[i][0]) !== -1 && array.indexOf(vm.gameWinConditions[i][1]) !== -1 && array.indexOf(vm.gameWinConditions[i][2]) !== -1){
          vm.gameOngoing = false;
          vm.gameWon     = true;
          vm.winner      = vm.player;
        } else {
          checkGameDraw();
        }
      }
    }

    // Checks for a draw
    function checkGameDraw(){
      const total = vm.xWins.length + vm.oWins.length;
      if (total === 9 && vm.gameWon === false){
        vm.gameOngoing = false;
        vm.gameDrawn   = true;
      }
    }

    // Resets game
    function resetGame(){
      const squares = document.getElementsByClassName("square");
      const tiles   = document.getElementsByClassName("tile");

      // Resets squares
      for (let i = 0; i < squares.length; i++){
        squares[i].classList.remove("x", "o", "inactive");
      }

      // Resets tiles
      for (let i = 0; i < tiles.length; i++){
        tiles[i].classList.remove("x", "o");
        tiles[i].classList.add("active");
      }

      // Resets variables
      vm.gameOngoing = true;
      vm.gameWon     = false;
      vm.gameDrawn   = false;
      vm.turnCounter = 0;
      vm.player      = "x";
      vm.xMoves      = [[],[],[],[],[],[],[],[],[]];
      vm.oMoves      = [[],[],[],[],[],[],[],[],[]];
      vm.xTiles      = [];
      vm.oTiles      = [];
      vm.xWins       = [];
      vm.oWins       = [];
    }

    // changes page
    function changePage(page){
      if (page === "home") {
        vm.home  = true;
        vm.rules = false;
      } else {
        vm.home  = false;
        vm.rules = true;
      }
      $state.go(page);
    }

  }
})();
