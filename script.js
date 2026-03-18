let hunger = 50;
let happiness = 50;
let energy = 50;

function update() {
    document.getElementById("hunger").innerText = hunger;
    document.getElementById("happiness").innerText = happiness;
    document.getElementById("energy").innerText = energy;

    const pet = document.getElementById("pet");

    if (hunger < 30) {
        pet.src = "hungry"
    }
}