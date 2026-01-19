let selected = [];
let resetBtn = null;
let verifyBtn = null;
let para = null;

// Heading
const h3 = document.createElement("h3");
h3.id = "h";
h3.innerText =
  "Please click on the identical tiles to verify that you are not a robot.";
document.body.appendChild(h3);

// Load images
function loadImages() {
  document.querySelectorAll("img, button, p").forEach(el => el.remove());

  selected = [];
  resetBtn = null;
  verifyBtn = null;
  para = null;

  const images = ["img1", "img2", "img3", "img4", "img5"];
  const duplicate = images[Math.floor(Math.random() * images.length)];
  const allImages = [...images, duplicate];

  // Shuffle images
  allImages.sort(() => Math.random() - 0.5);

  // Render images
  allImages.forEach(className => {
    const img = document.createElement("img");
    img.className = className; // 🔥 REQUIRED for CSS & visibility
    img.setAttribute("data-ns-test", className);

    img.addEventListener("click", () => onImageClick(img));
    document.body.appendChild(img);
  });
}

// Image click handler
function onImageClick(img) {
  // Prevent double click on same image
  if (selected.includes(img)) return;

  // Prevent more than 2 selections
  if (selected.length === 2) return;

  selected.push(img);

  // Show Reset button (State 2)
  if (!resetBtn) {
    resetBtn = document.createElement("button");
    resetBtn.id = "reset";
    resetBtn.innerText = "Reset";
    resetBtn.onclick = loadImages;
    document.body.appendChild(resetBtn);
  }

  // Show Verify button (State 3)
  if (selected.length === 2 && !verifyBtn) {
    verifyBtn = document.createElement("button");
    verifyBtn.id = "verify"; // 🔥 REQUIRED ID
    verifyBtn.innerText = "Verify";
    verifyBtn.onclick = verify;
    document.body.appendChild(verifyBtn);
  }
}

// Verify logic (State 4)
function verify() {
  verifyBtn.remove();
  verifyBtn = null;

  para = document.createElement("p");
  para.id = "para";

  if (
    selected[0].className === selected[1].className
  ) {
    para.innerText = "You are a human. Congratulations!";
  } else {
    para.innerText =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  document.body.appendChild(para);
}

// Initial State
loadImages();
