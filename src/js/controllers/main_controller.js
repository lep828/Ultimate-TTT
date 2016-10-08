(function(){
  'use strict';

  angular
    .module("tictactoe")
    .controller("MainController", MainController);

  MainController.$inject = ["$state"];
  function MainController($state){
    // namespacing 'this'
    var vm = this;

    // ************************ //
    // *** Global Variables *** //
    // ************************ //

    // Board Variables
    vm.tiles         = [0,1,2,3,4,5,6,7,8];
    vm.squares       = [[0,1],[1,4],[2,9],[3,16],[4,25],[5,36],[6,49],[7,64],[8,81]];
    vm.winConditions = [14,77,194, // Horizontals
                        66,93,126, // Verticals
                        83,107];   // Diagonals

    // Turn counter variables
    vm.turnCounter   = 0;
    vm.player        = "x";

    // Player Variables
    vm.xMoves        = [[],[],[],[],[],[],[],[],[]];
    vm.oMoves        = [[],[],[],[],[],[],[],[],[]];
    vm.xTiles        = [];
    vm.oTiles        = [];

    // Viewmodel Functions
    vm.getMove       = getMove;
    vm.homePage      = homePage;
    vm.rulesPage     = rulesPage;

    // ***************** //
    // *** Functions *** //
    // ***************** //

    // get player's move
    function getMove(tile, value, $event){
      var square = $event.currentTarget.classList;
      if (vm.player === 'x'){
        if (checkMove(square, tile)){
          vm.xMoves[tile].push(value);
          square.add(vm.player);
          checkTileWin(tile);
        } else {
          return false;
        }
      } else {
        if (checkMove(square, tile)){
          vm.oMoves[tile].push(value);
          square.add(vm.player);
          checkTileWin(tile);
        } else {
          return false;
        }
      }
      vm.turnCounter++;
      getPlayer();
      moveBoard($event.currentTarget);
    }

    // get player
    function getPlayer(){
      // If evens then x's turn, odds then o's turn
      if (vm.turnCounter % 2 === 0){
        vm.player = 'x';
      } else {
        vm.player = 'o';
      }
    }

    // Checks if move is valid
    function checkMove(square, tile){
      // Checks if the tile is active || if the square is inactive
      if (checkTile(tile) || square.value.indexOf("inactive") !== -1){
        return false;
      }
      
      // Checks if the square has been taken already
      if(square.value.indexOf("x") === -1 && square.value.indexOf("o") === -1){
        return true;
      } else {
        return false;
      }
    }

    // move board to the corresponding tile
    function moveBoard(square){
      var tiles = document.getElementsByClassName("tile");

      // Regex to find the square index
      var regex = new RegExp("[0-9]");
      var squareIndex = parseInt(regex.exec(square.classList[1]));

      // Checks if the corresponding tile has been won
      if (tiles[squareIndex].classList[1] !== "x" && tiles[squareIndex].classList[1] !== "o"){
        for (var i = 0; i < tiles.length; i++){
          tiles[i].classList.remove("active");
        }
        tiles[squareIndex].classList.add("active");
      } else {
        // If tile has been won, allow any other tile to be clicked
        for (var j = 0; j < tiles.length; j++){
          tiles[j].classList.add("active");
        }
        tiles[squareIndex].classList.remove("active");
      }
    }

    // Checks for a tile win
    function checkTileWin(tile){
      var total = 0;
      var array = [];

      if (vm.player === 'x'){
        array = vm.xMoves[tile];
      } else {
        array = vm.oMoves[tile];
      }

      // Loops to add all possible combinations together to check for wins
      for (var i = 0; i < array.length; i++){
        total = array[i];
        for (var j = i+1; j < array.length; j++){
          total = array[i] + array[j];
          for (var k = j+1; k < array.length; k++){
            total += array[k];

            for (var l = 0; l < vm.winConditions.length; l++){
              if (total === vm.winConditions[l]){
                console.log("WINNER", vm.player, total);
                setTile(tile);
              }
            }
          }
        }
      }
    }

    // Checks if the tile is active
    function checkTile(tileIndex){
      var tiles = document.getElementsByClassName("tile");
      var tile  = tiles[tileIndex].classList; 
      return tile[1] !== "active" ? true : false;
    }

    // Sets tile to the winner
    function setTile(tileIndex){
      var tile = document.getElementById("tile"+tileIndex);
      tile.classList.add(vm.player);
      setSquares(tile);
    }
    
    // Sets won squares to inactive
    function setSquares(tile){
      for (var i = 0; i < vm.squares.length; i++){
        document.getElementById(tile.id + "square" + vm.squares[i][0]).classList.add("inactive");
      }
    }

    // Checks for a draw

    // Reset board

    // Displays rules page
    function rulesPage(){
      $state.go("rules");
    }

    // Displays home page
    function homePage(){
      $state.go("home");
    }
  }
})();
