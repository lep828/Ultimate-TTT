(function(){
  'use strict';

  angular
    .module("ttt")
    .controller("MainController", MainController);

  function MainController(){
    var vm = this;

    // Variables
    // win conditions
    vm.winConditions = [14,77,194, // Horizontals
                        66,93,126, // Verticals
                        83,107];   // Diagonals
      // turn count
    vm.turnCounter = 0;
      // players moves
    vm.player1Moves = [];
    vm.player2Moves = [];

    // Functions
      // build board
      // player move
      // move board (to the subsection corresponding)
      // turn counter
      // check win
      // check draw

  }
})();
