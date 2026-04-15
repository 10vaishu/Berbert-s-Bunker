let hunger = 50;
let happiness = 50;
let energy = 50;

const fade = document.getElementById("fade");

const food = document.getElementById("food");
let isDragging = false;

const hand = document.getElementById("hand");

document.addEventListener("mousemove", (e) => {
    if (hand && hand.style.display === "block") {
        hand.style.left = e.clientX + "px";
        hand.style.top = e.clientY + "px";
    }
});


   function goRoom(room) {
    const fade = document.getElementById("fade");
    fade.style.opacity = 1;

    setTimeout (() => {
        document.querySelectorAll(".room").forEach(r => r.classList.remove("active"));
        document.getElementById(room).classList.add("active");

        if (room === "playroom") startPlay();
        if (room === "bedroom") enableBedDrag();

        document.querySelectorAll(".pet").forEach(pet => {
            pet.style.left = "60%";
            pet.style.top = "60%";
        });

        fade.style.opacity = 0;
    },  300);
}

  if (food) 
    food.addEventListener("mousedown", () => isDragging = true);
    
    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            food.style.left = e.clientX + "px";
            food.style.top = e.clientY + "px";
        }
    });

    document.addEventListener("mouseup", () => {
        if (!isDragging) return;
        isDragging = false;

        const pet = document.querySelector("#kitchen .pet");
        const petRect = pet.getBoundingClientRect();
        const foodRect = food.getBoundingClientRect();

        if (
            foodRect.left < petRect.right &&
            foodRect.right > petRect.left &&
            foodRect.top < petRect.bottom &&
            foodRect.bottom > petRect.top
        ){

            setTimeout(() => {
                feed();
                showHeart();
            

            food.style.transition = "none";
            food.style.left = "50%";
            food.style.bottom = "50px";
            food.style.top = "";
            food.style.transform = "scale(1)";
        }, 300);
    } else {
        food.style.left = "50%";
        food.style.bottom = "50px";
        food.style.top = "";
    }
    });







function update() {
  
    const pet = document.getElementById("pet");

    if (pet) {
       let mood = "neutral.png";

       if (hunger < 30) mood = "hungry.png";
       else if (energy < 30) mood = "sleepy.png";
       else if (happiness > 70) mood = "happy.png";

       if (!pet.src.includes(mood)) {
       pet.src = mood;
       animate();
    }
}

   const hBar = document.getElementById("hungerBar");
   const  happyBar = document.getElementById("happyBar");
   const eBar = document.getElementById("energyBar");

   if (hBar && happyBar && eBar) {
       hBar.style.width = hunger + "%";
       happyBar.style.width = happiness + "%";
       eBar.style.width = energy + "%";
   }
}



function feed() {
    hunger = Math.min(hunger + 20, 100);
    update();
}

function play() {
    happiness = Math.min(happiness + 15, 100);
    energy = Math.max(energy - 5, 0);
    update();
}

function sleep() {
    const fade = document.getElementById("fade");
    const pet = document.querySelector("#bedroom .pet");

    fade.style.opacity = 1;

    pet.style.left = "%50";
    pet.style.top = "50%";

    setTimeout(() => {
        energy = 100;
        hunger = Math.max(hunger - 10, 0);
        happiness = Math.min(happiness + 10, 100);

        update();

        goRoom("main");
        fade.style.opacity = 0;
    },  1500);
}


function animate() {
    const pet = document.getElementById("pet");
    if (!pet) return;

    pet.classList.add("pop");
    setTimeout(() => pet.classList.remove("pop"), 200);
}



setInterval(() => {
    hunger = Math.max(hunger - 1, 0);
    happiness = Math.max(happiness - 1, 0);
    energy = Math.max(energy - 1, 0);
    update();
}, 7000);



function showHeart() {
    const heart = document.createElement("div");
    heart.innerText = "💖";
    heart.style.position = "absolute";
    heart.style.left = "50%";
    heart.style.top = "40%";
    heart.style.fontSize = "40px";
    heart.style.transform = "translate(-50%, -50%)";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 800);
}

function playEatSound() {
    const sound = new Audio("bite.mp3");
    sound.play();
}

let playScore = 0;

function startPlay() {
    playScore = 0;

    const pet = document.querySelector("#playroom .pet");

    pet.onclick = () => {
        playScore++;
        showHeart();

        if (playScore >= 10) {
            happiness = Math.min(happiness + 20, 100);
            energy = Math.max(energy - 10, 0);
            update();
            showPopup("Playtime over!");
            pet.onclick = null;
        }
    };
}

function enableBedDrag() {
    const pet = document.querySelector("#bedroom .pet");
    const bed = document.getElementById("bedZone");

    let dragging = false;

    pet.onmousedown = () => dragging = true;

    document.onmousemove = (e) => {
        if (dragging) {
            pet.style.left = e.clientX + "px";
            pet.style.top = e.clientY + "px";
        }
    };

    document.onmouseup = () => {
        if (!dragging) return;
        dragging = false;

        const petRect = pet.getBoundingClientRect();
        const bedRect = bed.getBoundingClientRect();

        if (
            petRect.left < bedRect.right &&
            petRect.right > bedRect.left &&
            petRect.top < bedRect.bottom &&
            petRect.bottom > bedRect.top
        ) {
            sleep();
        }
    };
}




function showPopup(text) {
    document.getElementById("popupText").innerText = text;
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

let ball = document.getElementById("ball");
let ballDragging = false;

if (ball) {
    ball.addEventListener("mousedown", () => ballDragging = true);

    document.addEventListener("movemove", (e) => {
        if (ballDragging) {
            ball.style.left = e.clientX + "px";
            ball.style.top = e.clientY + "px";
        }
    });

    document.addEventListener("mouseup", () => {
        if (!ballDragging) return;
        ballDragging = false;

        const pet = document.querySelector("#kitchen .pet");
        const petRect = pet.getBoundingClientRect();
        const ballRect = ball.getBoundingClientRect();

        if (
            ballRect.left < petRect.right &&
            ballRect.right > petRect.left &&
            ballRect.top < petRect.bottom &&
            ballRect.bottom > petRect.top
        ) {
            showHeart();
            happiness = Math.min(happiness + 10, 100);
            energy = Math.max(energy - 5, 0);
            update();

            // bounce effect
            pet.classList.add("pop");
            setTimeout(() => pet.classList.remove("pop"), 200);
        }

        // reset ball
        ball.style.left = "50%";
        ball.style.bottom = "80px";
        ball.style.top = "";
    });
}

update();