let WIDTH = 800;
let HEIGHT = 600;

const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let ball;
let ballSize = 80;
let yspeed = 5.0;
let xspeed = 5.0;
let lives = 10; // Number of lives
let livesText; // Text object to display lives
let gameOverText; // Text object for "Game Over"

function preload() {
    this.load.image("ball", "assets/ball.png"); // Load the ball image
}

function create() {
    // Create the ball sprite
    ball = this.add.sprite(WIDTH / 2, HEIGHT / 2, "ball");
    ball.setDisplaySize(ballSize, ballSize); // Set ball size

    // Make the ball interactive
    ball.setInteractive();
    ball.on('pointerdown', () => {
        lives++; // Increase lives by 1
        livesText.setText(`Lives: ${lives}`); // Update the lives text
    
        // Increase the speed of the ball
        xspeed *= 1.1; // Increase horizontal speed by 10%
        yspeed *= 1.1; // Increase vertical speed by 10%
    }); 

    // Create a text object to display lives
    livesText = this.add.text(10, 10, `Lives: ${lives}`, {
        fontSize: '24px',
        fill: '#fff',
        backgroundColor: '#000',
        padding: { x: 10, y: 5 }
    });

    // Create a hidden "Game Over" text object
    gameOverText = this.add.text(WIDTH / 2, HEIGHT / 2, 'Game Over', {
        fontSize: '48px',
        fill: '#ff0000',
        padding: { x: 20, y: 10 },
        align: 'center'
    });
    gameOverText.setOrigin(0.5); // Center the text
    gameOverText.setVisible(false); // Hide it initially
}

function update() {
    // Update ball position
    ball.y += yspeed;
    ball.x += xspeed;

    // Check for collisions with the top or bottom of the screen
    if (ball.y >= HEIGHT - ballSize / 2 || ball.y <= ballSize / 2) {
        yspeed *= -1; // Reverse vertical direction
        loseLife.call(this); // Call loseLife with the correct context
    }

    // Check for collisions with the left or right of the screen
    if (ball.x >= WIDTH - ballSize / 2 || ball.x <= ballSize / 2) {
        xspeed *= -1; // Reverse horizontal direction
    }
}

function loseLife() {
    lives--; // Decrease lives by 1
    livesText.setText(`Lives: ${lives}`); // Update the lives text

    if (lives <= 0) {
        // End the game if lives reach 0
        gameOverText.setVisible(true); // Show the "Game Over" text

        // Use a timed event to pause the scene after a short delay
        this.time.delayedCall(200, () => {
            this.scene.pause(); // Pause the scene after 500ms
        });
    }
}