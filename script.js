const lift = document.getElementById('lift');
const mobileButtons = document.querySelectorAll('.mobile-btn');
const liftButtons = document.querySelectorAll('.lift-btn');
const addPersonButton = document.getElementById('add-person');
const removePersonButton = document.getElementById('remove-person');

let currentFloor = 1;
let queue = [];
let totalPersons = 0;
const FLOOR_HEIGHT = 100; // Height for each floor
const MAX_WEIGHT = 500; // Maximum weight in kg
const PERSON_WEIGHT = 50; // Average weight per person

// Function to move the lift
function moveLift() {
    if (queue.length > 0) {
        const nextFloor = queue.shift();
        const direction = nextFloor > currentFloor ? 'up' : 'down';

        // Move the lift visually
        lift.style.bottom = `${(nextFloor - 1) * FLOOR_HEIGHT}px`;

        // Simulate time taken based on the number of floors
        setTimeout(() => {
            currentFloor = nextFloor;
            console.log(`Lift is at floor ${currentFloor}`);
            updateButtons();
            moveLift(); // Continue processing the queue
        }, Math.abs(nextFloor - currentFloor) * 1000); // 1 second per floor
    }
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

    mobileButtons.forEach((btn) => {
        const floor = parseInt(btn.dataset.floor);
        if (queue.includes(floor)) {
            btn.classList.add('active');
        }
    });

    liftButtons.forEach((btn) => {
        const floor = parseInt(btn.dataset.floor);
        if (queue.includes(floor)) {
            btn.classList.add('active');
        }
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
        console.log(`Added a person. Total persons: ${totalPersons}`);
    } else {
        alert('Weight limit exceeded!');
    }
});

// Remove a person from the lift
removePersonButton.addEventListener('click', () => {
    if (totalPersons > 0) {
        totalPersons -= 1;
        console.log(`Removed a person. Total persons: ${totalPersons}`);
    } else {
        alert('No persons to remove!');
    }
});

// Initialize lift position
lift.style.bottom = `${(currentFloor - 1) * FLOOR_HEIGHT}px`;
