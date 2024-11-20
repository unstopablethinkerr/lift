let currentFloor = 1;
let isMoving = false;

const liftDoor = document.getElementById("lift-door");
const floorIndicator = document.getElementById("floor-indicator");

function updateFloorIndicator(floor) {
    floorIndicator.textContent = "Floor " + floor;
}

function callLift(floor) {
    if (isMoving) return; // Prevent multiple calls while moving
    moveLift(floor);
}

function moveLift(floor) {
    if (isMoving || floor === currentFloor) return; // Prevent moving if already on the requested floor

    isMoving = true;
    liftDoor.style.top = "-20px"; // Open door animation

    setTimeout(() => {
        // Simulate lift movement
        let movementDuration = Math.abs(floor - currentFloor) * 1000; // 1 second per floor
        setTimeout(() => {
            currentFloor = floor;
            updateFloorIndicator(floor);
            liftDoor.style.top = "0"; // Close door animation
            isMoving = false;
        }, movementDuration);
    }, 1000); // Wait 1 second before moving
}
