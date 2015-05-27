(function() {
  if (typeof SnakeGame === 'undefined') {
    window.SnakeGame = {};
  };

  var Board = SnakeGame.Board = function() {
    this.snake = new SnakeGame.Snake();
    this.createBoard();
    this.render();
  }

  Board.prototype.render = function() {
    var display = "";
    for (var row = 0; row < this.board.length; row++){
      for (var col = 0; col < row.length; col++){
        if (this.board[row][col] === "undefined"){
          display += ".";
        } else {
          display += "S";
        }
      }
      display += "<br>";
    }

    return display;
  }

  Board.prototype.createBoard = function () {
    this.board = [];
    for(var i = 0; i < 10; i++) {
      board.push(Array.new(10));
    }
    var snakePos = this.snake.pos;
    this.board[snakePos[0]][snakePos[1]] = 'S';
  }

})();
