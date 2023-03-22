function loadImageRoll() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match(/^image\/(png|jpeg)$/)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.classList.add("uploaded-image");
        const smartphoneScreen = document.getElementById("smartphoneScreen");
        smartphoneScreen.innerHTML = "";
        smartphoneScreen.appendChild(img);
        // 画像読み込み後にスクロール処理を追加
        const screenHeight = smartphoneScreen.clientHeight;
        const imgHeight = img.clientHeight;
        const scrollDuration = 7000; // スクロールする時間（7秒）
        let startTime = null;
        const step = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const timeElapsed = timestamp - startTime;
          const distance = (imgHeight - screenHeight) / 2;
          const scrollAmount = distance * (timeElapsed / scrollDuration);
          smartphoneScreen.scrollTo(0, scrollAmount);
          if (scrollAmount < distance) {
            window.requestAnimationFrame(step);
          } else {
            startTime = null;
            smartphoneScreen.scrollTo(0, distance);
            window.setTimeout(() => {
              smartphoneScreen.innerHTML = "";
              loadImage(1);
            }, 2000); // 2秒待機する
          }
        };
        window.requestAnimationFrame(step);
      };
      reader.readAsDataURL(file);
    } else {
      alert("ファイルを選択してください（PNGまたはJPEG）");
    }
  };
  input.click();

  const smartphoneScreen = document.getElementById("smartphoneScreen");
  const screenHeight = smartphoneScreen.clientHeight;
  const scrollDuration = 7000; // スクロールする時間（7秒）
  let startTime = null;
  let imgHeight = null;
  const img = smartphoneScreen.querySelector("img");
  if (img) {
    imgHeight = img.clientHeight;
    window.requestAnimationFrame(step);
  }
}

