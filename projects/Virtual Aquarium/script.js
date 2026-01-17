const aquarium = document.getElementById("aquarium");
const addFishBtn = document.getElementById("addFish");
const feedFishBtn = document.getElementById("feedFish");

const fishes = [];

// Create Fish
function addFish() {
  const fish = document.createElement("div");
  fish.className = "fish";
  fish.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;

  const x = Math.random() * (window.innerWidth - 80);
  const y = Math.random() * (window.innerHeight - 60);

  fish.style.left = x + "px";
  fish.style.top = y + "px";

  aquarium.appendChild(fish);

  const data = { el: fish, x, y };
  fishes.push(data);

  swimRandomly(data);
}

function swimRandomly(fish) {
  setInterval(() => {
    const x = Math.random() * (window.innerWidth - 80);
    const y = Math.random() * (window.innerHeight - 60);
    moveFish(fish, x, y);
  }, 4000);
}

function moveFish(fish, x, y) {
  if (x < fish.x) fish.el.style.transform = "scaleX(-1)";
  else fish.el.style.transform = "scaleX(1)";

  fish.x = x;
  fish.y = y;
  fish.el.style.left = x + "px";
  fish.el.style.top = y + "px";
}

// Initial fish
for (let i = 0; i < 5; i++) addFish();
addFishBtn.addEventListener("click", addFish);

// Ripple + Attract Nearby Fish
aquarium.addEventListener("click", (e) => {
  const rx = e.clientX;
  const ry = e.clientY;

  // Ripple
  const ripple = document.createElement("div");
  ripple.className = "ripple";
  ripple.style.left = rx + "px";
  ripple.style.top = ry + "px";
  aquarium.appendChild(ripple);
  setTimeout(() => ripple.remove(), 1200);

  // Move nearby fish
  fishes.forEach(fish => {
    const dx = fish.x - rx;
    const dy = fish.y - ry;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 250) {
      moveFish(fish, rx - 30, ry - 15);
    }
  });
});

// Feed
feedFishBtn.addEventListener("click", () => {
  const fx = Math.random() * window.innerWidth;
  const fy = 40;

  const food = document.createElement("div");
  food.className = "food";
  food.style.left = fx + "px";
  food.style.top = fy + "px";
  aquarium.appendChild(food);

  fishes.forEach(fish => {
    moveFish(fish, fx, fy);
  });

  setTimeout(() => food.remove(), 3000);
});
