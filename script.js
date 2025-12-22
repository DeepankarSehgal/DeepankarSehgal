const modal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    modal.style.display = "flex";
    modalVideo.src = card.dataset.video + "?autoplay=1";
  });
});

closeBtn.onclick = () => {
  modal.style.display = "none";
  modalVideo.src = "";
};

modal.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    modalVideo.src = "";
  }
};
