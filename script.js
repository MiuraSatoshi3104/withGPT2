document.addEventListener("DOMContentLoaded", () => {
  const smartphoneScreen = document.getElementById("smartphoneScreen");
  const storedImage = localStorage.getItem("uploadedImage");
  if (storedImage) {
    const img = document.createElement("img");
    img.src = storedImage;
    img.classList.add("uploaded-image");
    smartphoneScreen.appendChild(img);
  } else {
    localStorage.removeItem("uploadedImage");
  }
});

let currentImage = 0;
const images = [];
const imageCount = 3;

for (let i = 1; i <= imageCount; i++) {
  images.push(`image${i}.jpg`);
}

function loadImage() {
  const image = images[currentImage];
  const img = document.createElement("img");
  img.src = image;
  img.classList.add("uploaded-image");
  const smartphoneScreen = document.getElementById("smartphoneScreen");
  smartphoneScreen.innerHTML = "";
  smartphoneScreen.appendChild(img);
}

loadImage();

function uploadImage() {
  const input = document.getElementById("file-upload");
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      localStorage.setItem("uploadedImage", e.target.result);
      window.location.href = "index.html";
    };
    reader.readAsDataURL(input.files[0]);
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    currentImage = (currentImage + 1) % images.length;
    loadImage();
  } else if (event.key === "ArrowLeft") {
    currentImage = (currentImage - 1 + images.length) % images.length;
    loadImage();
  }
});
