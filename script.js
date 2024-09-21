// menu
let scrollpos = window.scrollY;
const navBackground = document.getElementById("nav-bg");
const navItems = Array.from(
  document.getElementById("nav-items-container").children
);
const navContainer = document.getElementById("nav-container");
const navBurgerButton = document.getElementById("nav-burger-button");
let burgerMenuActive = false;

navBurgerButton.addEventListener("click", () => {
  if (navContainer.classList.contains("hidden")) {
    navContainer.classList.remove("hidden");
    navItems.forEach((element) => {
      element.classList.remove("text-white", "hover:scale-[1.2]");
    });
    burgerMenuActive = true;
  } else {
    navContainer.classList.add("hidden");
    navItems.forEach((element) => {
      element.classList.add("text-white", "hover:scale-[1.2]");
    });
    burgerMenuActive = false;
  }
});

navItems.forEach((element) => {
  element.addEventListener("click", () => {
    if (!navContainer.classList.contains("hidden")) {
      navContainer.classList.add("hidden");
    }
  });
});

function checkScroll() {
  let scrollpos = window.scrollY;

  if (scrollpos > 10) {
    navItems.forEach((element) => {
      element.classList.remove("text-white");
    });
    navBackground.classList.add("bg-white");
  } else {
    if (!burgerMenuActive) {
      navItems.forEach((element) => {
        element.classList.add("text-white");
      });
    }
    navBackground.classList.remove("bg-white");
  }
  console.log(scrollpos);
}

window.addEventListener("load", checkScroll);
document.addEventListener("scroll", checkScroll);

//img carousel
const swiper = new Swiper(".mySwiper", {
  effect: "cube",
  grabCursor: true,
  loop: true,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 5000,
  },
});

const modal = document.getElementById("modal");
//modal.showModal();
const links = Array.from(document.querySelectorAll("[data-produkt]"));
links.forEach((element) => {
  element.addEventListener("click", (event) => {
    event.preventDefault();
    modal.showModal();
    setTimeout(() => {
      window.open(element.href, "_blank");
      modal.close();
    }, 4000);
  });
});

//Čas
const time = document.getElementById("time");
time.innerHTML =
  "©" + new Date().getFullYear().toString() + " " + time.innerHTML;

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

//animation scrolling
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
