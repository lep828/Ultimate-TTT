(function(){
  'use strict';

  angular
    .module("ttt")
    .controller("MainController", MainController);

  function MainController(){
    var vm = this;

    // Variables
      // Tiles
    vm.tiles         = [0,1,2,3,4,5,6,7,8];
      // Squares
    vm.squares       = [[0,1],[1,4],[2,9],[3,16],[4,25],[5,36],[6,49],[7,64],[8,81]];
      // win conditions
    vm.winConditions = [14,77,194, // Horizontals
                        66,93,126, // Verticals
                        83,107];   // Diagonals
      // turn count
    vm.turnCounter  = 0;
      // players moves
    vm.xMoves = [[],[],[],[],[],[],[],[],[]];
    vm.oMoves = [[],[],[],[],[],[],[],[],[]];
      // players tiles won
    vm.xTiles  = [];
    vm.oTiles  = [];

    // Viewmodel Functions
    vm.getMove      = getMove;

    // Functions
      // player move
    function getMove(tile, value, $event){
      var player = getPlayer();
      var square = $event.currentTarget.classList;
      if (player === 'x'){
        vm.xMoves[tile].push(value);
        if (checkMove(square)){
          square.add(player);
          checkWin(player, tile);
        } else {
          return false;
        }
      } else {
        vm.oMoves[tile].push(value);
        if (checkMove(square)){
          square.add(player);
          checkWin(player, tile);
        } else {
          return false;
        }
      }

      vm.turnCounter++;
    }
      // get player
    function getPlayer(){
      if (vm.turnCounter % 2 === 0){
        // If evens then x's turn
        return 'x';
      } else {
        // If odds then o's turn
        return 'o';
      }
    }
      // check for valid move
    function checkMove(square){
      // console.log(square, square.length);
        if(square.length !== 3){
          return true;
        } else {
          return false;
        }
    }
      // move board (to the subsection corresponding)
      // check win
    function checkWin(player, tile){
      // console.log(player, tile);
      var total = 0;
      var array = [];
      if (player === 'x'){
        array = vm.xMoves[tile];
      } else {
        array = vm.oMoves[tile];
      }

      for (var i = 0; i < array.length; i++){
        total = array[i];
        for (var j = i+1; j < array.length; j++){
          total = array[i] + array[j];
          for (var k = j+1; k < array.length; k++){
            total += array[k];
            for (var l = 0; l < vm.winConditions.length; l++){
              if (total === vm.winConditions[l]){
                console.log("WINNER", total);
              }
            }
          }
        }
      }
    }
      // check draw
      // reset/build board
  }
})();
