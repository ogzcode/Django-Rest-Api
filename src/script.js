const PADDLE_WIDTH = 8;
const PADDLE_HEIGHT = 75;


class Ball {
	constructor(){
		this.x = canvas.width / 2;
		this.y = canvas.height / 2;
		this.rad = 10;
		this.xSpeed = 4;
		this.ySpeed = 5;
	}
	
	draw(cx){
		cx.save();
		cx.fillStyle = "#ec1c24";
		cx.beginPath();
		cx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
		cx.fill();
		cx.restore();
	}
	
	update(){
		this.x += this.xSpeed;
		this.y += this.ySpeed;
	
		if (this.y - this.rad <= 0 || this.y + this.rad >= canvas.height){
			this.ySpeed *= -1;
		}
	}
}

class Paddle {
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.width = PADDLE_WIDTH;
		this.height = PADDLE_HEIGHT;
	}
	
	draw(cx){
		cx.save();
		cx.fillStyle = "#00a8f3";
		cx.beginPath();
		cx.rect(this.x, this.y, this.width, this.height);
		cx.fill();
		cx.restore();
	}
}


class Ai extends Paddle {
	constructor(x, y){
		super(x, y);
		this.ySpeed = 4;
		this.tolerans = 30;
	}
	
	update(ballPosY){
		if (ballPosY < this.y + this.height / 2 - this.tolerans){
			this.y -= this.ySpeed;
		}
		
		else if (ballPosY > this.y + this.height / 2 + this.tolerans){
			this.y += this.ySpeed;
		}
	}
}


class Player extends Paddle {
	constructor(x, y){
		super(x, y);
	}
	
	update(posY){
		this.y = posY;
		
		if (this.y < 0) this.y = 0;
		else if (this.y + this.height > canvas.height) this.y = canvas.height - this.height;
	}
}

function groundDraw(cx){
	cx.save();
	cx.strokeStyle = "white";
	cx.lineWidth = 2;
	
	//middle line
	cx.beginPath();
	cx.moveTo(canvas.width / 2, 0);
	cx.lineTo(canvas.width / 2, canvas.height);
	cx.stroke()
	
	//middle circle
	cx.beginPath();
	cx.arc(canvas.width / 2, canvas.height / 2, 100, 0, 2 * Math.PI);
	cx.stroke();
	
	//left half circle
	cx.beginPath();
	cx.arc(0, canvas.height / 2, 200, 1.5 * Math.PI, 0.5 * Math.PI);
	cx.stroke();
	
	//right half circle
	cx.beginPath();
	cx.arc(canvas.width, canvas.height / 2, 200, 0.5 * Math.PI, 1.5 * Math.PI);
	cx.stroke();
	
	cx.restore();
}

function goalControl(ballObject){
	if (ballObject.x - ballObject.rad <= 0){
			playerScore++;
			updateScore(playerNode, playerScore);
			showResult("Player");
	}
	else if (ballObject.x + ballObject.rad >= canvas.width){
		aiScore++;
		updateScore(aiNode, aiScore);
		showResult("Computer");
	}
	else {
		return;
	}

	ballObject.x = canvas.width / 2;
}


function changeDirection(result, rect, ballObject){
	if (result == "right"){
		ballObject.x = rect.x + rect.width + ballObject.rad;
		ballObject.xSpeed *= -1;
	}
	else if (result == "left"){
		ballObject.x = rect.x - ballObject.rad;
		ballObject.xSpeed *= -1;
	}
	else if (result == "top"){
		ballObject.y = rect.y - ballObject.rad;
		ballObject.ySpeed *= -1;
	}
	else if (result == "bottom"){
		ballObject.y = rect.y + rect.height + ballObject.rad;
		ballObject.ySpeed *= -1;
	}
}


function collisionTest(rect, ballObject){
	let direction = "";
	
	let testX = ballObject.x;
	let testY = ballObject.y;
	
	if (ballObject.x < rect.x){
        testX = rect.x;
    }
    else if (ballObject.x > rect.x + rect.width){
		testX = rect.x + rect.width;
    }

    if (ballObject.y < rect.y){
		testY = rect.y;
    }
    else if (ballObject.y > rect.y + rect.height){
		testY = rect.y + rect.height;
    }
	
    let distX = ballObject.x - testX;
    let distY = ballObject.y - testY;
    let distance = Math.sqrt((distX * distX) + (distY * distY));
	
    if (distance <= ballObject.rad){
    	if (Math.abs(distX) > Math.abs(distY)){
		direction = distX > 0 ? "right" : "left";
        }
        else if (Math.abs(distY) > Math.abs(distX)){
            direction = distY > 0 ? "down" : "top";
        }
     }
	
     return direction;
}


function frame(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	groundDraw(context);
	
	ball.draw(context);
	ball.update();
	
	changeDirection(collisionTest(aiPaddle, ball), aiPaddle, ball);//ai collision
	changeDirection(collisionTest(playerPaddle, ball), playerPaddle, ball);//player collision
	
	goalControl(ball);
	
	aiPaddle.draw(context);
	aiPaddle.update(ball.y);
	
	playerPaddle.draw(context);
	
}

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const ball = new Ball();
const aiPaddle = new Ai(0, 0);
const playerPaddle = new Player(canvas.width - PADDLE_WIDTH, 0);


let playerScore = 0;
let aiScore = 0;

const aiNode = document.getElementById("ai");

const playerNode = document.getElementById("player");
const resultNode = document.getElementById("result");

//DOM function
const updateScore = (node, score) => node.innerText = score;
const showResult = (text) => {
	resultNode.innerText = `${text} Win!!`;
	setInterval(() => {resultNode.innerText = "";}, 1000);
}


canvas.addEventListener("mousemove", event => {
	let y = event.clientY - event.target.offsetTop;
	playerPaddle.update(y);
});

setInterval(frame, 1000 / 50);
