// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");
const revealOnScroll = () => {
  const h = window.innerHeight;
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < h - 100) {
      el.classList.add("active");
    }
  });
};
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// MODAL VIDEO
const modal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".project-card").forEach(card => {
  card.onclick = () => {
    modal.style.display = "flex";
    modalVideo.src = card.dataset.video + "?autoplay=1";
  };
});

closeBtn.onclick = () => {
  modal.style.display = "none";
  modalVideo.src = "";
};

modal.onclick = e => {
  if (e.target === modal) {
    modal.style.display = "none";
    modalVideo.src = "";
  }
};
