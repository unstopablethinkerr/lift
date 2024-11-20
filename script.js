let currentFloor = 1;
let isMoving = false;
let direction = "Stationary";
let queue = [];
let maxWeight = 500;
let currentWeight = 0;

const lift = document.getElementById("lift");
const currentFloorDisplay = document.getElementById("current-floor");
const directionDisplay = document.getElementById("direction");
const weightDisplay = document.getElementById("weight");

function updateStatus() {
    currentFloorDisplay.textContent = currentFloor;
    directionDisplay.textContent = direction;
    weightDisplay.textContent = currentWeight;
}

function moveLift(floor) {
    if (isMoving || floor === currentFloor || currentWeight > maxWeight) {
        return;
    }

    isMoving = true;
    direction = floor > currentFloor ? "Up" : "Down";

    updateStatus();

    let distance = Math.abs(floor - currentFloor);
    lift.style.transform = `translateY(-${(floor - 1) * 20}%)`;

    setTimeout(() => {
        currentFloor = floor;
        direction = "Stationary";
        updateStatus();
        isMoving = false;
        processQueue();
    }, distance * 1000); // Simulate 1 second per floor
}

function callLift(floor) {
    if (!queue.includes(floor) && floor !== currentFloor) {
        queue.push(floor);
        document.querySelector(`.floor-btn:nth-child(${floor})`).classList.add("active");
    }

    processQueue();
}

function processQueue() {
    if (isMoving || queue.length === 0) {
        return;
    }

    queue.sort((a, b) => Math.abs(currentFloor - a) - Math.abs(currentFloor - b));
    let nextFloor = queue.shift();
    document.querySelector(`.floor-btn:nth-child(${nextFloor})`).classList.remove("active");

    moveLift(nextFloor);
}

// Update weight input
document.getElementById("weight-input").addEventListener("input", (e) => {
    currentWeight = parseInt(e.target.value) || 0;
    updateStatus();
});
