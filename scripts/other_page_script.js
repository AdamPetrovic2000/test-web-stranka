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

// Rok aktualny
document.getElementById("time").innerText = new Date().getFullYear();

//cookies
const cookiesBar = document.getElementById("cookies");

window.addEventListener("load", () => {
  const cookiesArray = decodeURIComponent(document.cookie).split("; ");
  if (!cookiesArray.includes("cookiesApproved=true")) {
    cookiesBar.classList.remove("hidden");
  }
});

document.getElementById("cookie-button").addEventListener("click", () => {
  document.cookie =
    "cookiesApproved = true; expires =" + new Date(9999, 0, 1).toUTCString();
  cookiesBar.classList.add("hidden");
});
