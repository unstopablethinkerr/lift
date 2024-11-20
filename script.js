// script.js

// DOM elements
const lift = document.getElementById("lift");
const floorButtons = document.querySelectorAll(".floor-button");
const currentFloorDisplay = document.getElementById("current-floor");
const directionDisplay = document.getElementById("direction");

// State variables
let currentFloor = 1; // Start at floor 1
let targetQueue = []; // Queue of target floors
let isMoving = false;

// Event listener for floor buttons
floorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetFloor = parseInt(button.getAttribute("data-floor"));
    if (!targetQueue.includes(targetFloor) && targetFloor !== currentFloor) {
      targetQueue.push(targetFloor);
      processQueue();
    }
  });
});

// Function to process the floor queue
function processQueue() {
  if (isMoving || targetQueue.length === 0) return;

  const nextFloor = targetQueue.shift();
  moveToFloor(nextFloor);
}

// Function to move the lift to a target floor
function moveToFloor(targetFloor) {
  isMoving = true;
  const direction = targetFloor > currentFloor ? "Up" : "Down";
  const distance = Math.abs(targetFloor - currentFloor);
  const travelTime = distance * 1000; // 1 second per floor

  // Update display
  directionDisplay.textContent = `Direction: ${direction}`;
  currentFloorDisplay.textContent = `Floor: ${currentFloor}`;

  // Animate lift movement
  lift.style.transition = `bottom ${travelTime / 1000}s linear`;
  lift.style.bottom = `${(targetFloor - 1) * 80}px`; // 80px per floor height

  // Wait for the lift to reach the target floor
  setTimeout(() => {
    currentFloor = targetFloor;
    currentFloorDisplay.textContent = `Floor: ${currentFloor}`;
    directionDisplay.textContent = "Direction: Idle";
    isMoving = false;
    processQueue(); // Continue with the next floor in the queue
  }, travelTime);
}
