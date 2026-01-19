//your JS code here. If required.
// State variables
let selectedTiles = [];
let imageClasses = [];
let resetBtn, verifyBtn, para;

// Create heading
const h3 = document.createElement("h3");
h3.id = "h";
h3.innerText = "Please click on the identical tiles to verify that you are not a robot.";
document.body.appendChild(h3);

// Generate images
function loadImages() {
  document.querySelectorAll("img, button, p").forEach(e => e.remove());
  selectedTiles = [];
  imageClasses = [];

  // Base images
  const baseImages = ["img1", "img2", "img3", "img4", "img5"];

  // Pick one random image to duplicate
  const duplicate = baseImages[Math.floor(Math.random() * baseImages.length)];

  imageClasses = [...baseImages, duplicate];

  // Shuffle images
  imageClasses.sort(() => Math.random() - 0.5);

  // Render images
  imageClasses.forEach(cls => {
    const img = document.createElement("img");
    img.className = cls;
    img.addEventListener("click", () => handleImageClick(img));
    document.body.appendChild(img);
  });
}

// Handle image click
function handleImageClick(img) {
  if (selectedTiles.includes(img)) return;
  if (selectedTiles.length === 2) return;

  selectedTiles.push(img);

  // Show reset button after first click
  if (!resetBtn) {
    resetBtn = document.createElement("button");
    resetBtn.id = "reset";
    resetBtn.innerText = "Reset";
    resetBtn.onclick = loadImages;
    document.body.appendChild(resetBtn);
  }

  // Show verify button after two selections
  if (selectedTiles.length === 2 && !verifyBtn) {
    verifyBtn = document.createElement("button");
    verifyBtn.id = "verify";
    verifyBtn.innerText = "Verify";
    verifyBtn.onclick = verifyUser;
    document.body.appendChild(verifyBtn);
  }
}

// Verify logic
function verifyUser() {
  verifyBtn.remove();
  verifyBtn = null;

  para = document.createElement("p");
  para.id = "para";

  if (selectedTiles[0].className === selectedTiles[1].className) {
    para.innerText = "You are a human. Congratulations!";
  } else {
    para.innerText =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  document.body.appendChild(para);
}

// Initial load
loadImages();
