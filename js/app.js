// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.multiplier = Math.floor((Math.random() * 5) + 1);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + 101 * dt * this.multiplier;
    // Check for collisions with the player
    if (this.y == player.y && (this.x > player.x - 20 && this.x < player.x + 20)) {
        alert("Ouch you ran into abug!");
        player.reset();
    }
    if (this.x > 750) {
        this.reset();
    }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
    this.x = -200;
    var yVals = [220, 140, 60];
    this.y = yVals[Math.floor((Math.random() * 3))];
    this.multiplier = Math.floor((Math.random() * 5) + 1);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;

    this.initialX = x;
    this.initialY = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
        if (this.y <= 40) {
            alert("Oops you fell into the water!");
            this.reset();
        }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    // Reset the player to the original position
    this.x = this.initialX;
    this.y = this.initialY;
};
Player.prototype.handleInput = function(dir) {

    // Change the player's position based on the user keyboard input
    if (dir == 'up') {
        this.y = this.y - 80;
    } else if (dir == 'down') {
        this.y = this.y + 80;
    } else if (dir == 'left') {
        this.x = this.x - 101;
    } else if (dir == 'right') {
        this.x = this.x + 101;
    }

    if (this.x < 0) {
        this.x = 0;

    } else if (this.x > 400) {
        this.x = 400;

    }
    if (this.y < 0) {
        this.y = 0;

    } else if (this.y > 400) {
        this.y = 400;

    }
};


var Gem = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Star.png';
    this.initialX = x;
    this.initialY = y;
};

Gem.prototype.update = function(dt) {
    if (this.y == player.y && (this.x > player.x - 20 && this.x < player.x + 20)) {
        this.x = -100;
        this.y = -100;
    }

};

Gem.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.reset = function() {
    this.x=-200;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



var allEnemies = [];
var yVals = [220, 140, 60];


for (var i = 0; i < 5; i++) {
        // Set a starting x-position based on a random value
    var x = Math.floor((Math.random() * -1000) + 1);

    // Set a starting y-position based on a random selection
    // of the 3 possible values
    var y = yVals[Math.floor(Math.random() * 3)];

    // Create the new enemy object
    var enemy = new Enemy(x, y);

    // Push the enemy into the array
    allEnemies.push(enemy);
}

var gem = new Gem(220, 140);

var player = new Player(303, 380);




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});