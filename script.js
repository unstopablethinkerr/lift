let currentFloor = 1;
let direction = "Idle";
let personCount = 0;
let totalWeight = 0;
const maxWeight = 500;
const floorQueue = [];

const liftElement = document.getElementById('lift');
const floorButtons = document.querySelectorAll('.floor-button');
const addPersonBtn = document.getElementById('add-person');
const removePersonBtn = document.getElementById('remove-person');

function updateDisplay() {
  document.getElementById('current-floor').textContent = `Floor: ${currentFloor}`;
  document.getElementById('current-direction').textContent = `Direction: ${direction}`;
  document.getElementById('person-count').textContent = `Persons: ${personCount}`;
  document.getElementById('total-weight').textContent = `Weight: ${totalWeight} kg`;

  floorButtons.forEach(button => {
    const floor = parseInt(button.dataset.floor);
    if (floorQueue.includes(floor)) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

function moveLift() {
  if (floorQueue.length === 0) {
    direction = "Idle";
    updateDisplay();
    return;
  }

  const targetFloor = floorQueue.shift();
  const distance = Math.abs(targetFloor - currentFloor);

  direction = targetFloor > currentFloor ? "Up" : "Down";
  updateDisplay();

  liftElement.style.bottom = `${(targetFloor - 1) * 20}%`;

  setTimeout(() => {
    currentFloor = targetFloor;
    moveLift();
  }, distance * 2000);
}

floorButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetFloor = parseInt(button.dataset.floor);
    if (!floorQueue.includes(targetFloor)) {
      floorQueue.push(targetFloor);
      floorQueue.sort((a, b) => {
        if (direction === "Up") return a - b;
        else return b - a;
      });
      if (direction === "Idle") moveLift();
    }
    updateDisplay();
  });
});

addPersonBtn.addEventListener('click', () => {
  personCount++;
  totalWeight += 50;
  updateDisplay();
});

removePersonBtn.addEventListener('click', () => {
  if (personCount > 0) {
    personCount--;
    totalWeight -= 50;
    updateDisplay();
  }
});

// Initialize display
updateDisplay();
