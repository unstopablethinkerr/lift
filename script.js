let currentFloor = 1;
let direction = "Idle";
let personCount = 0;
let totalWeight = 0;
const maxWeight = 500;
const floors = [1, 2, 3, 4, 5];
const liftElement = document.getElementById('lift');
const floorButtons = document.querySelectorAll('.floor-button');
const addPersonBtn = document.getElementById('add-person');
const removePersonBtn = document.getElementById('remove-person');

function updateDisplay() {
  document.getElementById('current-floor').textContent = `Floor: ${currentFloor}`;
  document.getElementById('current-direction').textContent = `Direction: ${direction}`;
  document.getElementById('person-count').textContent = `Persons: ${personCount}`;
  document.getElementById('total-weight').textContent = `Weight: ${totalWeight} kg`;
}

function moveLift(targetFloor) {
  if (totalWeight > maxWeight) {
    alert("Weight limit exceeded! Reduce passengers to proceed.");
    return;
  }

  const distance = Math.abs(targetFloor - currentFloor);
  direction = targetFloor > currentFloor ? "Up" : "Down";
  updateDisplay();

  liftElement.style.transform = `translateY(-${(targetFloor - 1) * 20}%)`;

  setTimeout(() => {
    currentFloor = targetFloor;
    direction = "Idle";
    updateDisplay();
  }, distance * 1000);
}

floorButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetFloor = parseInt(button.getAttribute('data-floor'));
    if (targetFloor !== currentFloor) {
      moveLift(targetFloor);
    }
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
