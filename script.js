const footerText = document.querySelector('.footer-content');
const imgPath = 'koromo.jpeg'; // 画像のパスを指定
let imgElement;

footerText.addEventListener('mouseenter', () => {
  imgElement = document.createElement('img');
  imgElement.src = imgPath;
  imgElement.classList.add('footer-image'); // クラス名を追加
  imgElement.style.height = '100%';
  imgElement.style.objectFit = 'contain';
  imgElement.style.transition = 'opacity 3s';
  footerText.innerHTML = '';
  footerText.appendChild(imgElement);
});


footerText.addEventListener('mouseleave', () => {
  setTimeout(() => {
    imgElement.style.opacity = 0;
    setTimeout(() => {
      footerText.removeChild(imgElement);
      footerText.textContent = '@2023 Miura Satoshi. All rights reserved.';
    }, 1000); // 3秒後に元の文字が表示される
  }, 5000); // 画像を7秒間キープ
});


document.addEventListener("DOMContentLoaded", function () {
  const fadeInElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );
  fadeInElements.forEach((element) => {
    observer.observe(element);
  });
  loadCSV(); // CSVファイルを読み込む
});


//マウスアニメーション
const follower = document.querySelector('.follower');

document.addEventListener('mousemove', (e) => {
  anime({
    targets: follower,
    left: e.pageX - 25,
    top: e.pageY - 25,
    duration: 500,
    easing: 'easeOutCubic',
  });
});

//マウスホバーアニメーション　テキスト
document.querySelectorAll(".hover-animation").forEach((element) => {
  element.setAttribute("data-text", element.textContent);
});

//csvを読み込み
document.getElementById("csvFile").addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    const data = event.target.result;
    parseCSV(data);
  };
  reader.readAsText(file);
});

//csv自動読み込み
async function loadCSV() {
  try {
    const response = await fetch("./text.csv");
    if (response.ok) {
      const data = await response.text();
      parseCSV(data);
    } else {
      console.error("CSVファイルの読み込みに失敗しました");
    }
  } catch (error) {
    console.error("CSVファイルの読み込み中にエラーが発生しました:", error);
  }
}


//30秒毎に更新
let timer;
let particles = [];

function parseCSV(csvData) {
  const rows = csvData.split("\n");
  const words = rows.map(row => row.split(",")[0]);
  createParticles(words);
  timer = setInterval(function () {
    createParticles(words);
  }, 30000); // 30秒ごとに更新
}

function createParticles(words) {
  const container = document.getElementById("particleContainer");
  container.innerHTML = ""; // 既存のパーティクルをクリア
  particles = [];

  for (let i = 0; i < 75; i++) {
    const index = Math.floor(Math.random() * words.length);
    const word = words[index];
    const particleContainer = document.createElement("div");
    particleContainer.classList.add("particle-container");
    particleContainer.style.position = "absolute";

    // 文字列を1文字ずつに分割し、それらに個別のdiv要素を作成する
    const chars = word.split("");
    chars.forEach((char) => {
      const charDiv = document.createElement("div");
      charDiv.textContent = char;
      charDiv.style.display = "block"; // 縦に並べる
      particleContainer.appendChild(charDiv);
    });


    //30個に1個赤文字を設定する
    if (i % 30 === 0) {
      const chars = particleContainer.querySelectorAll("div");
      chars.forEach((char) => {
        char.style.color = "red";
      });
    }

    // 方向と初期位置をランダムに設定
    const direction = Math.floor(Math.random() * 4);
    const randomFontSize = Math.floor(Math.random() * (60 - 12) + 12); // 12から60までのランダムなフォントサイズ
    particleContainer.style.fontSize = randomFontSize + "px";


    // 上下に流れる文字列だけ縦に表示する
    if (direction === 2 || direction === 3) {
      const chars = word.split("");
      chars.forEach((char) => {
        const charDiv = document.createElement("div");
        charDiv.textContent = char;
        charDiv.style.display = "block"; // 縦に並べる
        particleContainer.appendChild(charDiv);
      });
      particleContainer.style.zIndex = 1; // 縦の文字を横の文字の下に表示
    } else {
      // 横に動く文字列はCSVファイルのまま表示する
      const charDiv = document.createElement("div");
      charDiv.textContent = word;
      particleContainer.appendChild(charDiv);
      particleContainer.style.zIndex = 2; // 横の文字を縦の文字の上に表示
    }


    switch (direction) {
      case 0: // 左から右
        particleContainer.style.left = -50 + "vw";
        particleContainer.style.top = Math.random() * 100 + "vh";
        break;
      case 1: // 右から左
        particleContainer.style.left = 100 + 50 + "vw";
        particleContainer.style.top = Math.random() * 100 + "vh";
        break;
      case 2: // 上から下
        particleContainer.style.left = Math.random() * 100 + "vw";
        particleContainer.style.top = -50 + "vh";
        break;
      case 3: // 下から上
        particleContainer.style.left = Math.random() * 100 + "vw";
        particleContainer.style.top = 100 + 50 + "vh";
        break;
    }

    container.appendChild(particleContainer);
    particles.push({
      element: particleContainer,
      direction: direction,
      speed: Math.random() * (0.035 - 0.01) + 0.01, // 0.01から0.05までのランダムな速度を割り当てる
    });
  }

  animateParticles(); // アニメーションを開始

  //文字がフェードアウトする仕様追加
  clearInterval(timer);
  timer = setInterval(function () {
    container.classList.add('fade-out');
    setTimeout(() => {
      createParticles(words);
      container.classList.remove('fade-out');
    }, 10000);
  }, 25000); //トータルで　5000+25000で切り替え時間30000と会うようにするのかな

}

function animateParticles() {
  particles.forEach(particleData => {
    const particle = particleData.element;
    const speed = particleData.speed;

    switch (particleData.direction) {
      case 0: // 左から右
        particle.style.left = parseFloat(particle.style.left) + speed + "vw";
        break;
      case 1: // 右から左
        particle.style.left = parseFloat(particle.style.left) - speed + "vw";
        break;
      case 2: // 上から下
        particle.style.top = parseFloat(particle.style.top) + speed + "vh";
        break;
      case 3: // 下から上
        particle.style.top = parseFloat(particle.style.top) - speed + "vh";
        break;
    }
  });

  requestAnimationFrame(animateParticles);
}

//ファイル選択BOX入力後非表示
const csvFile = document.getElementById('csvFile');

csvFile.addEventListener('change', (event) => {
  loadCSV(); // CSVファイルを読み込む
  csvFile.style.display = 'none';  // ファイル選択ダイアログを非表示にする
});


