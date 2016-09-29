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
    vm.player1Moves = [[],[],[],[],[],[],[],[],[]];
    vm.player2Moves = [[],[],[],[],[],[],[],[],[]];
      // players tiles won
    vm.player1Tiles  = [];
    vm.player2Tiles  = [];

    // Viewmodel Functions
    vm.getMove      = getMove;

    // Functions
      // player move
    function getMove(tile, value, $event){
      // console.log(tile, value);
      var player = getPlayer();
      // console.log(player);
      var square = $event.currentTarget.classList;
      console.log(square);
      if (player === 1){
        vm.player1Moves[tile].push(value);
        if (checkMove(square)){
          square.add("x");
        } else {
          return false;
        }
      } else {
        vm.player2Moves[tile].push(value);
        if (checkMove(square)){
          square.add("o");
        } else {
          return false;
        }
      }

      vm.turnCounter++;
    }
      // check for valid move
    function checkMove(square){
      if(square.length !== 3){
        return true;
      } else {
        return false;
      }
    }
      // move board (to the subsection corresponding)
      // get player
    function getPlayer(){
      if (vm.turnCounter % 2 === 0){
        // If evens player 1's turn
        return 1;
      } else {
        // If odds player 2's turn
        return 2;
      }
    }
      // check win
      // check draw
      // reset/build board
  }
})();
