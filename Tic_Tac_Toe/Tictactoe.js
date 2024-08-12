
const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");//All boxes are fetched
const newGameBtn = document.querySelector(".btn");

//Declaring variables

let currentPlayer;   //Its default value is X
let gameGrid;        //Its default value is grid is empty in starting

const winningPositions = [  // Craeting array of winning position
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]

];

//lets create a function to initialize an game

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""]; // Initailyy grid or all boxes is empty

    //UI PE BHI EMPTY KARNA HOGA
    boxes.forEach((box,index) =>{
        box.innerText= "";
        boxes[index].style.pointerEvents = "all";
        boxes[index].classList.remove("win");   // remove green color

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText= `Current Player - ${currentPlayer}`; //


}
initGame();



//Add eventlistner on all boxes 

boxes.forEach((box, index)=>{  // foeach methd calls a function for each elemtn of an array
        box.addEventListener("click", ()=>{
            handleClick(index);  // we know here konse index wale box pe click kia
        })
});

function handleClick(index){

    if(gameGrid[index] === ""){  // Agar clicked index par grid empty hui tabhi 
        boxes[index].innerText = currentPlayer; //changes on ui
        gameGrid[index] = currentPlayer;      //changes in above gamegrid
        boxes[index].style.pointerEvents = "none";
         
        //swap turn X ke badd O chlega
        swapTurn();
        //check koi jeet toh nahi gya
        checkGameOver();

    }
}

function swapTurn(){

    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

//check game over condition
function checkGameOver(){   //Here we check for gridgame values and winningpositios arays
    let answer = "";

    winningPositions.forEach((position)=>{  //Ek element niklega array se position = [0,1,2],.....
       
       // All 3 boxes should be non empty and exactly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2] !== ""])
         && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
                
            //Check if winner is X or O

            if(gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";

                boxes.forEach((box) =>{
                    box.style.pointerEvents = "none"; // All mouse events  disabled.
                })

                //Now we know the winner set the bg green

                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");


         }
    });
     //Means we have a winner
    if(answer !== "" ){
        gameInfo.innerText = `Winner Player - ${answer}`; //Show winner nme
        newGameBtn.classList.add("active");               // Show new game button
        return;
    }
      // If we have is no winner ; game tied
       let fillCount = 0;
       gameGrid.forEach((box)=>{
        if(box !== ""){
            fillCount++;

        }
       });

       if(fillCount === 9){
        gameInfo.innerHTML = "Game Tied !";
        newGameBtn.classList.add("active");
       }
       

}

//On clicking new game button 

newGameBtn.addEventListener("click" , () =>{
    initGame();
});






