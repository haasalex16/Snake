;(function() {
  if (typeof SnakeGame === "undefined"){
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function() {
    this.dir = "N";
    this.pos = [5,5];
  };

  Snake.DIRECTIONS = {
    "N": [0,1],
    "E": [1,0],
    "S": [0,-1],
    "W": [-1,0]
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

  Snake.prototype.move = function() {
    var dir = Snake.DIRECTIONS[this.dir];
    this.pos = plus(this.pos, dir);
  };

})();
