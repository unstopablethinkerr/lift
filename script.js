const lift = document.getElementById('lift');
const mobileButtons = document.querySelectorAll('.mobile-btn');
const liftButtons = document.querySelectorAll('.lift-btn');
const addPersonButton = document.getElementById('add-person');
const removePersonButton = document.getElementById('remove-person');
const directionDisplay = document.createElement('div');
const weightDisplay = document.createElement('div');

let currentFloor = 1;
let queue = [];
let totalPersons = 0;
const FLOOR_HEIGHT = 100; // Height for each floor
const MAX_WEIGHT = 500; // Maximum weight in kg
const PERSON_WEIGHT = 50; // Average weight per person
let isMoving = false; // Track if the lift is moving

// Create direction and weight displays
directionDisplay.id = 'direction';
directionDisplay.textContent = 'Direction: Idle';
weightDisplay.id = 'weight';
weightDisplay.textContent = 'Current Weight: 0 kg';
document.querySelector('.lift-controls').appendChild(directionDisplay);
document.querySelector('.lift-controls').appendChild(weightDisplay);

// Function to move the lift
function moveLift() {
    if (isMoving || queue.length === 0) return;

    isMoving = true;

    const nextFloor = queue.shift();
    const direction = nextFloor > currentFloor ? 'Up' : 'Down';

    // Update direction display
    directionDisplay.textContent = `Direction: ${direction}`;
    lift.style.bottom = `${(nextFloor - 1) * FLOOR_HEIGHT}px`;

    // Simulate time taken to move between floors
    setTimeout(() => {
        currentFloor = nextFloor;
        console.log(`Lift is at floor ${currentFloor}`);
        updateButtons();

        // Check if more requests exist in the queue
        if (queue.length === 0) {
            directionDisplay.textContent = 'Direction: Idle';
        }

        isMoving = false;
        moveLift(); // Continue processing the queue
    }, Math.abs(nextFloor - currentFloor) * 1200); // 1 second per floor
}

// Add a floor request to the queue
function addRequest(floor) {
    if (!queue.includes(floor) && floor !== currentFloor) {
        queue.push(floor);
        queue.sort((a, b) => a - b); // Sort queue for efficient movement
        moveLift();
    }
}

// Update button states (active and idle)
function updateButtons() {
    mobileButtons.forEach((btn) => btn.classList.remove('active'));
    liftButtons.forEach((btn) => btn.classList.remove('active'));

    // Highlight active requests
    queue.forEach((floor) => {
        document.querySelector(`.mobile-btn[data-floor="${floor}"]`).classList.add('active');
        document.querySelector(`.lift-btn[data-floor="${floor}"]`).classList.add('active');
    });
}

// Event listeners for mobile buttons
mobileButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const floor = parseInt(button.dataset.floor);
        button.classList.add('active');
        addRequest(floor);
    });
});

// Event listeners for lift buttons
liftButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const floor = parseInt(button.dataset.floor);
        button.classList.add('active');
        addRequest(floor);
    });
});

// Add a person to the lift
addPersonButton.addEventListener('click', () => {
    if (totalPersons * PERSON_WEIGHT < MAX_WEIGHT) {
        totalPersons += 1;
        updateWeightDisplay();
    } else {
        alert('Weight limit exceeded!');
    }
});

// Remove a person from the lift
removePersonButton.addEventListener('click', () => {
    if (totalPersons > 0) {
        totalPersons -= 1;
        updateWeightDisplay();
    } else {
        alert('No persons to remove!');
    }
});

// Update weight display
function updateWeightDisplay() {
    const totalWeight = totalPersons * PERSON_WEIGHT;
    weightDisplay.textContent = `Current Weight: ${totalWeight} kg`;
}

// Initialize lift position
lift.style.bottom = `${(currentFloor - 1) * FLOOR_HEIGHT}px`;
