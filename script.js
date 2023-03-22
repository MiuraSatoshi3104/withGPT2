// const screenHeight = window.innerHeight;
// const scrollDuration = 7000; // スクロールする時間（7秒）
// let startTime = null;

// function loadImageRoll() {
//   const input = document.createElement("input");
//   input.type = "file";
//   input.accept = "image/*";
//   input.onchange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.match(/^image\/(png|jpeg)$/)) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const img = document.createElement("img");
//         img.src = e.target.result;
//         img.classList.add("uploaded-image");
//         const smartphoneScreen = document.getElementById("smartphoneScreen");
//         smartphoneScreen.innerHTML = "";
//         smartphoneScreen.appendChild(img);

//         let scrollAmount = 0;
//         let distance = 0;
//         const imgHeight = img.clientHeight;
//         if (imgHeight > screenHeight) {
//           distance = imgHeight - screenHeight;
//         }
//         const step = (timestamp) => {
//           if (!startTime) startTime = timestamp;
//           const timeElapsed = timestamp - startTime;
//           scrollAmount = distance * (timeElapsed / scrollDuration);
//           smartphoneScreen.scrollTo(0, scrollAmount);
//           if (scrollAmount < distance) {
//             window.requestAnimationFrame(step);
//           } else {
//             startTime = null;
//             smartphoneScreen.scrollTo(0, distance);
//             window.setTimeout(() => {
//               smartphoneScreen.innerHTML = "";
//               loadImage(1);
//             }, 2000); // 2秒待機する
//           }
//         };
//         window.requestAnimationFrame(step);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       alert("ファイルを選択してください（PNGまたはJPEG）");
//     }
//   };
//   input.click();
// }
const inputFile = document.getElementById('input-file');
const leftButton = document.getElementById('left-button');
const rightButton = document.getElementById('right-button');
const imagePreview = document.getElementById('image-preview');
const animationArea = document.querySelector('.animation-area');

leftButton.addEventListener('click', () => {
    inputFile.click();
});

inputFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
    };

    reader.readAsDataURL(file);
});

rightButton.addEventListener('click', () => {
    const newImage = document.createElement('img');
    newImage.src = imagePreview.src;
    newImage.style.position = 'absolute';
    newImage.style.width = '100%';
    newImage.style.opacity = '1';
    newImage.style.transition = '7s linear';
    animationArea.appendChild(newImage);

    setTimeout(() => {
        newImage.style.transform = 'translateY(100%)';
        newImage.style.opacity = '0';
    }, 100);

    setTimeout(() => {
        animationArea.removeChild(newImage);
    }, 7000);
});
