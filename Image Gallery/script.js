const galleryItems = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentIndex = 0;

galleryItems.forEach((img, index) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
    currentIndex = index;
  });
});


closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

function showImage(index) {
  if (index < 0) index = galleryItems.length - 1;
  if (index >= galleryItems.length) index = 0;
  lightboxImg.src = galleryItems[index].src;
  currentIndex = index;
}

nextBtn.addEventListener("click", () => showImage(currentIndex + 1));
prevBtn.addEventListener("click", () => showImage(currentIndex - 1));


const filterSelect = document.getElementById("category");
const searchInput = document.getElementById("search");
const galleryBoxes = document.querySelectorAll(".gallery-item"); 
filterSelect.addEventListener("change", () => {
  filterGallery();
});


searchInput.addEventListener("keyup", () => {
  filterGallery();
});

function filterGallery() {
  const category = filterSelect.value.toLowerCase();
  const searchText = searchInput.value.toLowerCase();

  galleryBoxes.forEach(item => {
    const matchesCategory =
      category === "all" || item.classList.contains(category);
    const matchesSearch =
      item.innerText.toLowerCase().includes(searchText);

    if (matchesCategory && matchesSearch) {
      item.style.display = "block";
      item.style.opacity = "1";
    } else {
      item.style.display = "none";
      item.style.opacity = "0";
    }
  });
}
