(function () {
  if (typeof SnakeGame === "undefined"){
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function($el){
    this.board = new SnakeGame.Board();
    this.$el = $el;
    setInterval(this.step, 500);
  }

  View.prototype.eventBinder = function () {
    $(document).on('keydown', function (event) {
      var key = event.keyCode;
      this.handleKeyEvent(key);
    }.bind(this))
  }
  View.prototype.step = function () {
    this.board.snake.move();
    this.board.render();
    console.log(this.board.snake.pos);
  }

  View.prototype.handleKeyEvent = function (keyCode) {
    var a = 65; //97
    var s = 83; //115
    var d = 68; // 100
    var w = 87; // 119
    var dir;
    switch (keyCode) {
      case a:
        dir = "W";
        break;
      case s:
        dir = "S";
        break;
      case d:
        dir = "E";
        break;
      case w:
        dir = "N";
        break;
    }
    this.board.snake.dir = dir;
  };


})
