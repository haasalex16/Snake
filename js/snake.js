;(function() {
  if (typeof SnakeGame === "undefined"){
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function() {
    this.dir = "N";
    this.pos = [10,10];
    this.segments = [];
    this.snakeLength = 0;
  };

  Snake.DIRECTIONS = {
    "E": [0,  1],
    "S": [1,  0],
    "W": [0, -1],
    "N": [-1, 0]
  };

  var plus = function(position, velocity) {
    return [position[0] + velocity[0], position[1] + velocity[1]];
  };

  var equals = function(pos1, pos2) {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1];
  };

  var isOpposite = function(vel1, vel2) {
    return (vel1[0] === vel2[0] * -1) && (vel1[0] === vel2[0] * -1);
  };

  Snake.prototype.offBoard = function () {

    if (this.pos[0] < 0 || this.pos[0] == 20) {
      return true;
    }
    if (this.pos[1] < 0 || this.pos[1] == 20) {
      return true;
    }
    return false;
  }


  Snake.prototype.move = function() {
    var dir = Snake.DIRECTIONS[this.dir];
    this.segments.push(this.pos);
    if (this.snakeLength < this.segments.length) {
      this.segments.shift(1);
    }
    this.pos = plus(this.pos, dir);
  };

  Snake.prototype.intersect = function(pos) {
    this.segments.forEach(function(position){
      if (equals(pos, position)) {
        return true;
      }
    })
    return false;
  }

  Snake.prototype.grow = function() {
    this.snakeLength += 3;
  }
  // BOARD STUFF

  var Board = SnakeGame.Board = function() {
    this.snake = new SnakeGame.Snake();
    this.board = []
    this.createBoard();
    this.render();
    this.apple = null
    this.score = 0
  }

  Board.prototype.eat = function () {
    if (this.apple) {
      if (equals(this.snake.pos, this.apple)) {
        this.apple = null;
        this.score += 10;
        this.snake.grow();
      }
    }
  };


  Board.prototype.addApple = function() {
    if (!this.apple) {
      var apple = [Math.floor(Math.random()*20), Math.floor(Math.random()*20)]
      while(!equals(this.snake.pos, apple) && !this.snake.intersect(apple) ) {
        apple = [Math.floor(Math.random()*20), Math.floor(Math.random()*20)]
      }
      this.apple = apple;
    }
  }

  Board.prototype.render = function() {
    if (this.snake.offBoard()) {
      // alert("Game Over");
    }
    this.eat();

    var display = "";
    for (var row = 0; row < this.board.length; row++){
      display += "<ul>"
      for (var col = 0; col < this.board[0].length; col++){
        display += "<li></li>"
      }
      display += "</ul>"
    }
    return display;
  }

  Board.prototype.createBoard = function () {
    for(var i = 0; i < 20; i++) {
      this.board.push(new Array(20));
    }
  }

})();
