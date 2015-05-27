(function () {
  if (typeof SnakeGame === "undefined"){
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function($el){
    this.board = new SnakeGame.Board();
    this.$el = $el;
    this.$el.html(this.board.render());
    this.eventBinder();
    game = setInterval(this.step.bind(this), 100);
    this.interval = 0;
  }

  View.prototype.eventBinder = function () {
    $(document).on('keydown', function (event) {
      var key = event.keyCode;
      this.handleKeyEvent(key);
    }.bind(this))
  }
  View.prototype.step = function () {
    this.interval++;
    this.board.snake.move();
    this.$el.html(this.board.render());
    this.drawSnake(this.board.snake.pos, this.board.snake.segments);
    if (this.interval % 5 === 0) {
      this.board.addApple();
    }
    this.drawApple();
  }

  View.prototype.drawApple = function () {
    if (this.board.apple) {
      var $ul = $(this.$el.find('ul').get(this.board.apple[0]));
      var $li = $($ul.find('li').get(this.board.apple[1]));
      $li.addClass('apple');

    }
  };

  View.prototype.drawSnake = function (pos, segments) {
    var $ul = $(this.$el.find('ul').get(pos[0]));
    var $li = $($ul.find('li').get(pos[1]));
    $li.addClass('snake-head');
    segments.forEach(function(segment){
      var $ul = $(this.$el.find('ul').get(segment[0]));
      var $li = $($ul.find('li').get(segment[1]));
      $li.addClass('snake');
    }.bind(this));
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
    if (!this.board.snake.isOpposite(dir)) {
      this.board.snake.dir = dir;
    }
  };


})();
