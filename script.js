//JS from template
let scrollpos = window.scrollY;
const header = document.getElementById("header");
const navcontent = document.getElementById("nav-content");
const toToggle = document.querySelectorAll(".toggleColour");
//moje
const logoIcon = document.getElementById("logo-icon");

document.addEventListener("scroll", function () {
  /*Apply classes for slide in bar*/
  scrollpos = window.scrollY;

  if (scrollpos > 10) {
    //moje
    logoIcon.src = "img/logo_PC_gray.svg";

    header.classList.add("bg-white");
    //Use to switch toggleColour colours
    for (var i = 0; i < toToggle.length; i++) {
      toToggle[i].classList.add("text-gray-800");
      toToggle[i].classList.remove("text-white");
    }
    header.classList.add("shadow");
    navcontent.classList.remove("bg-gray-100");
    navcontent.classList.add("bg-white");
  } else {
    //moje
    logoIcon.src = "img/logo_PC_white.svg";

    header.classList.remove("bg-white");
    //Use to switch toggleColour colours
    for (var i = 0; i < toToggle.length; i++) {
      toToggle[i].classList.add("text-white");
      toToggle[i].classList.remove("text-gray-800");
    }

    header.classList.remove("shadow");
    navcontent.classList.remove("bg-white");
    navcontent.classList.add("bg-gray-100");
  }
});
/*Toggle dropdown list*/
/*https://gist.github.com/slavapas/593e8e50cf4cc16ac972afcbad4f70c8*/

let navMenuDiv = document.getElementById("nav-content");
let navMenu = document.getElementById("nav-toggle");

document.onclick = check;
function check(e) {
  let target = (e && e.target) || (event && event.srcElement);

  //Nav Menu
  if (!checkParent(target, navMenuDiv)) {
    // click NOT on the menu
    if (checkParent(target, navMenu)) {
      // click on the link
      if (navMenuDiv.classList.contains("hidden")) {
        navMenuDiv.classList.remove("hidden");
      } else {
        navMenuDiv.classList.add("hidden");
      }
    } else {
      // click both outside link and outside menu, hide menu
      navMenuDiv.classList.add("hidden");
    }
  }
}
function checkParent(t, elm) {
  while (t.parentNode) {
    if (t == elm) {
      return true;
    }
    t = t.parentNode;
  }
  return false;
}

//doplnkov templatu
//ked klikne schova sa

const navItems = Array.from(navcontent.children[0].children);
navItems.forEach((e) => {
  e.addEventListener("click", () => {
    if (!navMenuDiv.classList.contains("hidden")) {
      navMenuDiv.classList.add("hidden");
    }
  });
});

//my JS

const modalCloseButtonImg = document.getElementById("modal-close-img");
const modalWindowImg = document.getElementById("modal-window-img");
const modalImg = document.getElementById("modal-img");
const modalCloseButtonForm = document.getElementById("modal-close-form");
const modalWindowForm = document.getElementById("modal-window-form");
const form = document.getElementById("form");

function hideModal(element) {
  document.documentElement.classList.remove("overflow-hidden");
  element.classList.remove("flex");
  element.classList.add("hidden");
}
function showModal(element) {
  document.documentElement.classList.add("overflow-hidden");
  element.classList.add("flex");
  element.classList.remove("hidden");
}

modalWindowForm.addEventListener("click", (e) => {
  if (e.target == modalWindowForm) {
    hideModal(modalWindowForm);
  }
});

modalCloseButtonForm.addEventListener("click", () => {
  hideModal(modalWindowForm);
});

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   showModal(modalWindowForm);
// });

modalCloseButtonImg.addEventListener("click", () => {
  hideModal(modalWindowImg);
});

//clicked outside
modalWindowImg.addEventListener("click", (e) => {
  if (e.target == modalWindowImg) {
    hideModal(modalWindowImg);
  }
});
//all images
const imgArray = Array.from(document.querySelectorAll(".my-query-selector"));

//show clicked img modal
imgArray.forEach((element) => {
  element.addEventListener("click", (e) => {
    modalImg.src = e.target.src;
    showModal(modalWindowImg);
  });
});

function next() {
  let currentIndex = imgArray.findIndex(
    (element) => element.src == modalImg.src
  );
  if (currentIndex + 1 > imgArray.length - 1) {
    currentIndex = 0;
    modalImg.src = imgArray[currentIndex++].src;
  } else {
    modalImg.src = imgArray[currentIndex + 1].src;
  }
}

function previous() {
  let currentIndex = imgArray.findIndex(
    (element) => element.src == modalImg.src
  );
  if (currentIndex - 1 < 0) {
    currentIndex = imgArray.length - 1;
    modalImg.src = imgArray[currentIndex--].src;
  } else {
    modalImg.src = imgArray[currentIndex - 1].src;
  }
}

const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
//next img event button
nextButton.addEventListener("click", () => {
  next();
});
//previous img event button
previousButton.addEventListener("click", () => {
  previous();
});

//swiping img gallery
let positionStart = 0;
let positionEnd = 0;
// hodnota 20 aby bol nejaky pohyb nie len tak
function imgSwipe() {
  if (positionEnd - positionStart > 20) {
    // Swipe right
    next();
  } else if (positionEnd - positionStart < -20) {
    //Swipe left
    previous();
  }
}
//mobile Swipe
modalWindowImg.addEventListener("touchstart", (event) => {
  positionStart = event.changedTouches[0].screenX;
});
modalWindowImg.addEventListener("touchend", (event) => {
  positionEnd = event.changedTouches[0].screenX;
  imgSwipe();
});
//PC Swipe
modalWindowImg.addEventListener("mousedown", (event) => {
  positionStart = event.layerX;
});

modalWindowImg.addEventListener("mouseup", (event) => {
  positionEnd = event.layerX;
  imgSwipe();
});

//scroll animations
try {
  const animationElements = document.querySelectorAll(".my-hidden");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("my-show", entry.isIntersecting);
    });
  });

  animationElements.forEach((element) => observer.observe(element));
} catch {
  animationElements.forEach((element) => element.classList.add("my-show"));
}

const sections = Array.from(document.querySelectorAll("[data-index]"));
const navBarItems = Array.from(
  document.getElementById("nav-bar-items").children
);

//console.log(sections[0].dataset.index);
//console.log(navBarItems[0].children[0].getAttribute("href"));

const observerUnderLine = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      removeUnderLine();
      //add underline
      let index = entry.target.dataset.index;
      if (index >= 0) {
        navBarItems[index].children[0].classList.add("before:bg-black");
      }
    });
  },
  {
    threshold: 0.5,
  }
);

function removeUnderLine() {
  navBarItems.forEach((element) => {
    element.children[0].classList.remove("before:bg-black");
  });
}

sections.forEach((element) => observerUnderLine.observe(element));

// Rok aktualny
document.getElementById("time").innerText = new Date().getFullYear();
