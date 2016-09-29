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
    // vm.squares       = [0,1,2,3,4,5,6,7,8];
    vm.squares       = [[0,1],[1,4],[2,9],[3,16],[4,25],[5,36],[6,49],[7,64],[8,81]];
      // win conditions
    vm.winConditions = [14,77,194, // Horizontals
                        66,93,126, // Verticals
                        83,107];   // Diagonals
      // turn count
    vm.turnCounter  = 0;
      // players moves
    vm.player1Moves = [];
    vm.player2Moves = [];
      // players wins
    vm.player1Wins  = [];
    vm.player2Wins  = [];

    // Viewmodel Functions
    vm.getMove      = getMove;

    // Functions
      // reset/build board
      // player move
    function getMove(index, value, tile){
      console.log(index, value, tile);
    }
      // move board (to the subsection corresponding)
      // turn counter
      // check win
      // check draw

  }
})();
