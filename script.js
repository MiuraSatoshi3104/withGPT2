document.addEventListener("DOMContentLoaded", () => {
  const smartphoneScreen = document.getElementById("smartphoneScreen");
  const storedImage = localStorage.getItem("uploadedImage");
  if (storedImage) {
    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";
    const img = document.createElement("img");
    img.src = storedImage;
    imageContainer.appendChild(img);
    smartphoneScreen.appendChild(imageContainer);
  }
});

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
