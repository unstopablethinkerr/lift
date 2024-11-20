const lift = document.getElementById('lift');
const floorButtons = document.querySelectorAll('.floor-btn');
const currentFloorDisplay = document.getElementById('current-floor');
const directionDisplay = document.getElementById('direction');
const personCountDisplay = document.getElementById('person-count');
const totalWeightDisplay = document.getElementById('total-weight');

let currentFloor = 1;
let queue = [];
let personCount = 0;
let totalWeight = 0;

const FLOOR_HEIGHT = 100; // Height in pixels
const MAX_WEIGHT = 500;

function moveLift() {
    if (queue.length > 0) {
        const nextFloor = queue.shift();
        const direction = nextFloor > currentFloor ? 'Up' : 'Down';
        directionDisplay.textContent = direction;

        lift.style.bottom = `${(nextFloor - 1) * FLOOR_HEIGHT}px`;
        setTimeout(() => {
            currentFloor = nextFloor;
            currentFloorDisplay.textContent = currentFloor;
            directionDisplay.textContent = 'Idle';
            floorButtons.forEach(btn => btn.classList.remove('active'));
            moveLift();
        }, Math.abs(nextFloor - currentFloor) * 1000); // Delay based on floors
    }
}

function addFloorRequest(floor) {
    if (!queue.includes(floor) && floor !== currentFloor) {
        queue.push(floor);
        queue.sort((a, b) => Math.abs(a - currentFloor) - Math.abs(b - currentFloor)); // Prioritize nearest
        floorButtons[floor - 1].classList.add('active');
        moveLift();
    }
}

floorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const floor = parseInt(button.dataset.floor);
        addFloorRequest(floor);
    });
});

document.getElementById('add-person').addEventListener('click', () => {
    if (totalWeight + 50 <= MAX_WEIGHT) {
        personCount++;
        totalWeight += 50;
        personCountDisplay.textContent = personCount;
        totalWeightDisplay.textContent = totalWeight;
    } else {
        alert('Weight limit exceeded!');
    }
});

document.getElementById('remove-person').addEventListener('click', () => {
    if (personCount > 0) {
        personCount--;
        totalWeight -= 50;
        personCountDisplay.textContent = personCount;
        totalWeightDisplay.textContent = totalWeight;
    }
});
