/***********************************************************************************
	Timers and Buttons: Let's Race!
	by Natalie Morris

 This program uses the timer class and the clickable class to race two beanie
 babies. The beanie babies are assigned random speeds, and when the user clicks
 the start button, the two race across the screen. The timer keeps track of how
 long the winner takes to finish and displays it on the screen.

***********************************************************************************/

// Image variables
var swirly; // Snail racer
var legs; // Frog racer

// Button variables
var startButton;

// Timer variables
var raceTimer;
var elapsedSeconds;

// Coordinate variables
var swirlyX;
var legsX;

// Speed variables
var swirlySpeed;
var legsSpeed;

// Boolean variables
var raceStarted;
var raceOver;

// Load images and font
function preload() {
	swirly = loadImage('assets/swirly.png');
	legs = loadImage('assets/legs.png');
}

// Build canvas, center images and text, create font size
function setup() {
 	createCanvas(1200, 800);
 	imageMode(CENTER);
	textAlign(CENTER);
	textSize(13);

	// Call buttons and timers
	makeStartButton();
	drawTimer();

	// Initialize booleans
	raceStarted = false;
	raceOver = false;

	// Initialize timer variables
	elapsedSeconds = 0;

	// Set starting point of racers
	swirlyX = width / 2 - 400;
	legsX = width / 2 - 400;

	// Set random speed for racers
	swirlySpeed = random(1, 10);
	legsSpeed = random(1, 10);
 }


// Draws race scene, if race is started, racers move and timer begins
function draw() {
  background(255);

  drawRace();
  updateTimer();

  if (raceStarted) {
  	racersRace();
  }
}

// Display race scene
function drawRace() {
	// Draw finish line
	line(1080, 100, 1080, 550);

	// Draw racers
	image(swirly, swirlyX, height / 2, swirly.width / 2,  swirly.height / 2);
	image(legs, legsX, height / 2 - 200, legs.width / 2, legs.height / 2);

	// Draw start button
	startButton.draw();
}

// Create timer object
function drawTimer() {
	raceTimer = new Timer(0);
}

// If the race is still going, display the elapsed time on screen
function updateTimer() {
	if (raceOver === false) {
		if ( raceTimer.expired() ) {
			elapsedSeconds++;
			raceTimer.start();
		}
	}
}

// Move start button to middle of the screen and initialize it with text
function makeStartButton() {
	startButton = new Clickable();
	startButton.locate(width / 2, height / 2 + 200);
	startButton.text = "Start race!";
	startButton.resize(150, 30);
	startButton.onPress = startButtonPressed;
}

// Change start button text and move the racers to the finish line, draw the time
function racersRace() {
	startButton.text = "Go go go!";

	// Draw timer
	text("Winner's time: " + elapsedSeconds, width / 2 + 300, height / 2 + 220);
	fill(0);

	// Racers move according to their speeds
	swirlyX = swirlyX + swirlySpeed;
	legsX = legsX + legsSpeed;

	// If Swirly gets to finish line first
	if (swirlyX > 1080) {
		startButton.text = "Swirly the snail wins!";
		swirlySpeed = 0;
		legsSpeed = 0;
		raceOver = true;
	}

	// If Legs gets to finish line first
	if (legsX > 1080) {
		startButton.text = "Legs the frog wins!";
		swirlySpeed = 0;
		legsSpeed = 0;
		raceOver = true;
	}

	// If the speeds are the same, it's a tie
	if ( (legsX > 1080) && (swirlyX > 1080) && (swirlySpeed === legsSpeed) ) {
		startButton.text = "It's a tie!";
		raceOver = true;
	}
}

// When start button is pressed, timer begins and race has started
startButtonPressed = function() {
	raceTimer.start();
	raceStarted = true;
}