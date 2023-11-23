const state = {
    view: {
        square: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    value: {
        
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },

    actions: {
        timeId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}


function countDown(){
    state.value.currentTime--;
    state.view.timeLeft.textContent = state.value.currentTime;

    if(state.value.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timeId);
        alert("Game Over! Sua pontuacao foi: " + state.value.result)
    }
}

function playSound(){
    let audio = new Audio("../audio/hit.m4a")
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.square.forEach((square) => {
        square.classList.remove("enemy");
    });
    
    let randomNumber= Math.floor(Math.random()*9);
    let randomSquare= state.view.square[randomNumber];
    randomSquare.classList.add("enemy");
    state.value.hitPosition= randomSquare.id;
}


// function moveEnemy(){
//     state.value.timerId = setInterval(randomSquare, state.value.gameVelocity);
// }

function addListenerHitBox(){
    state.view.square.forEach((square) =>{
        square.addEventListener("mousedown", () => {
            if (square.id === state.value.hitPosition){
                state.value.result++;
                state.view.score.textContent = state.value.result;
                state.value.hitPosition = null;
                playSound();
            }
    });
});
    
}


function init(){
    addListenerHitBox();
}

init();