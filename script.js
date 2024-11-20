// script.js

// DOM elements
const lift = document.getElementById("lift");
const floorButtons = document.querySelectorAll(".floor-button");
const personCountDisplay = document.getElementById("person-count");
const weightDisplay = document.getElementById("weight");
const addPersonBtn = document.getElementById("add-person");
const removePersonBtn = document.getElementById("remove-person");

// State variables
let currentFloor = 1;
let targetQueue = [];
let isMoving = false;
let personCount = 0;
const maxPersons = 10;
const personWeight = 50; // 50 kg per person

// Event listeners for lift and mobile controls
floorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetFloor = parseInt(button.getAttribute("data-floor"));
    if (!targetQueue.includes(targetFloor) && targetFloor !== currentFloor) {
      targetQueue.push(targetFloor);
      processQueue();
    }
  });
});

// Add and remove person logic
addPersonBtn.addEventListener("click", () => {
  if (personCount < maxPersons) {
    personCount++;
    updateWeightDisplay();
  } else {
    alert("Lift is at maximum capacity!");
  }
});

removePersonBtn.addEventListener("click", () => {
  if (personCount > 0) {
    personCount--;
    updateWeightDisplay();
  }
});

function updateWeightDisplay() {
  personCountDisplay.textContent = `Persons: ${personCount}`;
  weightDisplay.textContent = `Weight: ${personCount * personWeight} kg`;
}

// Process floor queue
function processQueue() {
  if (isMoving || targetQueue.length === 0) return;

  if (personCount * personWeight > maxPersons * personWeight) {
    alert("Weight exceeds the maximum limit! Remove some persons to continue.");
    return;
  }

  const nextFloor = targetQueue.shift();
  moveToFloor(nextFloor);
}

// Move lift
function moveToFloor(targetFloor) {
  isMoving = true;
  const distance = Math.abs(targetFloor - currentFloor);
  const travelTime = distance * 1000; // 1 second per floor

  lift.style.bottom = `${(targetFloor - 1) * 100}px`; // 100px per floor height

  setTimeout(() => {
    currentFloor = targetFloor;
    isMoving = false;
    processQueue();
  }, travelTime);
}
