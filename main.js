// ナビゲーションをクリックでそこまで自動スクロール
function scrolltarget(select) {
    const target = document.getElementById(select);
    console.log(target)
    window.scrollTo({
      top: target.offsetTop - 100,
      behavior: "smooth"
    })
}

// スクロール量を検知してヘッダーに変化
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  const scrollY = window.pageYOffset;
  
  if (scrollY >= 40) {
    header.classList.add('header-opacity');
  } else {
    header.classList.remove('header-opacity');
  }
});

// モーダル動画
// サムネイル動画をクリックしたらモーダルを開く
document.querySelectorAll(".thumbnail").forEach(video => {
  video.addEventListener("click", () => {
    const modal = document.querySelector(`.modal[data-modal='${video.dataset.modal}']`);
    const modalVideo = modal.querySelector("video");
      
    // 動画のソースを直接設定
    modalVideo.src = video.querySelector("source").src;
    modalVideo.load();
    
    modal.classList.add("active");
    document.body.classList.add("no-scroll");
  });
});

// モーダルの操作
document.querySelectorAll(".modal").forEach(modal => {
    const closeButton = modal.querySelector(".close-btn");
    const playButton = modal.querySelector(".play-btn");
    const modalVideo = modal.querySelector("video");
    
    // モーダルを閉じる
    closeButton.addEventListener("click", () => {
      modal.classList.remove("active");
      modalVideo.pause();
      modalVideo.currentTime = 0;
      document.body.classList.remove("no-scroll");
    });
    
    // 再生・停止切り替え
    const togglePlay = () => {
      if (modalVideo.paused) {
          modalVideo.play();
          playButton.style.display = "none";
      } else {
          modalVideo.pause();
          playButton.style.display = "flex";
      }
    };
    
    playButton.addEventListener("click", togglePlay);
    modalVideo.addEventListener("click", togglePlay);
});
