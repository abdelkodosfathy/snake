let snake = document.querySelectorAll(".snake"),
score = document.querySelector(".num"),s = 0,
board = document.querySelector(".container"), food = document.querySelector(".food"),foodC,foodR,arrow = "Right",
a1 = {
    x: 10,
    y: 11
},
a2 = {
    x: 10,
    y: 11
},
a3 = {
    x: 10,
    y: 11
},
a4 = {
    x: 10,
    y: 11
};
snakeArr = [a1,a2,a3,a4],
d = 22;

board.style = `
width: ${d*15}px;
height: ${d*15}px;
grid-template-columns: repeat(${d}, 15px);
grid-template-rows: repeat(${d}, 15px);
`;

for(let i = 0; i < snake.length; i++){
    snake[i].style.gridColumnStart = snakeArr[i].x;
    snake[i].style.gridRowStart = snakeArr[i].y;
}

window.addEventListener("load", () => {
    console.log(snakeArr);
    snakeWalk();
    foodMaker();
});

document.onkeydown= (e) => {
    checkKey(e);
}


//generate the food 
function foodMaker () {
    foodC = Math.floor(Math.random() * (d-1))+1,
    foodR = Math.floor(Math.random() * (d-1))+1;
    food.style.gridColumnStart = foodC;
    food.style.gridRowStart = foodR;
    
    console.log(foodC +" "+ foodR);
}

//to move the snake
function snakeWalk(e) {
    setTimeout('snakeWalk()', 100);

    switch(arrow){
        case'Right':
        snakeArr[0].x = snakeArr[snakeArr.length-1].x+1;
        snakeArr[0].y = snakeArr[snakeArr.length-1].y;
        if(snakeArr[0].x >= (d+1)){
            snakeArr[0].x = 1;
        }
        break;
        case'Up':
        snakeArr[0].y = snakeArr[snakeArr.length-1].y-1;
        snakeArr[0].x = snakeArr[snakeArr.length-1].x;
        if(snakeArr[0].y <= 0){
            snakeArr[0].y = (d+1);
        }
        break;
        case'Left':
        snakeArr[0].x = snakeArr[snakeArr.length-1].x-1;
        snakeArr[0].y = snakeArr[snakeArr.length-1].y;
        if(snakeArr[0].x <= 0){
            snakeArr[0].x = (d+1);
        }
        break;
        case'Down':
        snakeArr[0].y = snakeArr[snakeArr.length-1].y+1
        snakeArr[0].x = snakeArr[snakeArr.length-1].x;
        if(snakeArr[0].y >= (d+1)){
            snakeArr[0].y = 0;
        }
        break;
    }

    for(let i = 1; i < snakeArr.length; i++){
        if(snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y){
            console.log("erorr");
            document.body.innerHTML = "<h1>Game Over</h1>";
        }
    }

    // delet the first element of the snake and add new one with new x,y;
    snakeArr.push(snakeArr[0]);
    snakeArr.shift();

    // set the parts of the snake as the snakeArr elements 
    for(let i = 0; i < snake.length; i++){
        snake[i].style.gridColumnStart = snakeArr[i].x;
        snake[i].style.gridRowStart = snakeArr[i].y;
    }

    // check if the snake ate food or not 
    if (snakeArr[snakeArr.length-1].x === foodC && snakeArr[snakeArr.length-1].y === foodR) {
        let a = {
                x: snakeArr[0].x,
                y: snakeArr[0].y
            }
        snakeArr.unshift(a);
        
        snakeBody = document.createElement("div");
        snakeBody.classList.add("snake");

        board.appendChild(snakeBody);
        
        snake = document.querySelectorAll(".snake");

        snake.length = snake.length + 1;
        snake[snake.length-1] = snakeBody;
        for(let i = 0; i < snake.length; i++){
            snake[i].style.gridColumnStart = snakeArr[i].x;
            snake[i].style.gridRowStart = snakeArr[i].y;
        }
        s++
        score.innerHTML = `${s}`;
        foodMaker();
        }
}

// read the directions
function checkKey(e) {
    let key = e.key;
    console.log(key);
    switch(key){
        case 'ArrowLeft':
            if(arrow === "Right"){
                arrow = "Right";
                break;
            }
            arrow = "Left";
            break;
        case 'ArrowUp':
            if(arrow === "Down"){
                arrow = "Down";
                break;
            }
            arrow = "Up";
            break;
        case 'ArrowDown':
            if(arrow === "Up"){
                arrow = "Up";
                break;
            }
            arrow = "Down";
            break;
        case 'ArrowRight':
            if(arrow === "Left"){
                arrow = "Left";
                break;
            }
            arrow = "Right";
            break;
    }
    
}