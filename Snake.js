
let lastPaintTime = 0;
const snakeSpeed = 5;


let gameBoard = document.getElementById('gameBoard');
let scoreBoard = document.getElementById('scoreBoard')

snakeArr=[
    {x : 16 , y : 12},
]

food = {  x : Math.round(Math.random()*30) , y : Math.round(Math.random()*30)};

let inputDirection = {x : 0 , y : 0};
let lastInputDirection = inputDirection;


let score = 0;




function paint(cTime){
    window.requestAnimationFrame(paint);
    if((cTime-lastPaintTime)/1000 < 1/snakeSpeed ) {return;};
     lastPaintTime = cTime;
    // console.log(cTime);
    update();
    draw();
    }


window.requestAnimationFrame(paint);


function draw(){
    drawSnake();
    drawFood();
}


function update(){
    gameBoard.innerHTML = "";
    moveSnake();
    eatFood();
};


function drawSnake(){
    snakeArr.forEach((e , index)=>{
        snakeBody = document.createElement('div'); 
        snakeBody.style.gridColumnStart = e.x;
        snakeBody.style.gridRowStart = e.y;
        if( index == 0){ 
            snakeBody.classList.add('head');
        }
        else{
            snakeBody.classList.add('snake');
        }
        gameBoard.appendChild(snakeBody);
    })
}


function drawFood(){
    foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
 }


 function moveSnake(){
    inputDirection = getinputDirection();

    for(i = snakeArr.length - 2 ; i>=0 ; i--){
        snakeArr[i+1] = {...snakeArr[i]}
    }
    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;
    gameOver();
 }
 function getinputDirection(){
    window.addEventListener("keydown", e=>{
        
        switch(e.key){
            case 'ArrowUp' : 
            if(lastInputDirection.y == 1) return;
            inputDirection = {x : 0, y : -1}
            break;
            case 'ArrowDown' : 
            if(lastInputDirection.y == -1) return;
            inputDirection = {x : 0, y : 1}
            break;
            case 'ArrowLeft' : 
            if(lastInputDirection.x == 1) return;
            inputDirection = {x : -1, y : 0}
            break;
            case 'ArrowRight' : 
            if(lastInputDirection.x == -1) return;
            inputDirection = {x : 1, y : 0}
            break;
            default : inputDirection = { x : 0, y : 0}
        }
       
    })
    lastInputDirection = inputDirection
    return inputDirection; 
}


function eatFood(){
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        food = updateFood();
        expandSnake();
        score += 1;
        scoreBoard.innerHTML = 'Score:' + score;
    }};


    function updateFood(){
        let a,b, myCondition = true;
        while(myCondition){
            a = Math.round(Math.random()*30);
            b = Math.round(Math.random()*30);
    
            myCondition = snakeArr.some(segment=>{
                 return segment.x === a && segment.y === b;
            })
        }
        return {x : a, y : b};
    }


    function expandSnake(){
        for(i=0 ; i<1 ; i++){
            snakeArr.push(snakeArr[snakeArr.length-1]);
        }
    }


    function gameOver(){
        if(snakeArr[0].x > 30 || snakeArr[0].x < 0 || snakeArr[0].y > 30 || snakeArr[0].y < 0){
            alert('game over');
            location.reload();
        }
        for(i = 1 ; i<snakeArr.length ; i++){
        if(snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y){
            alert('game over');
            location.reload()
        }
    }
    };
   
