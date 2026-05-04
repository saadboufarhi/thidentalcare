'use strict';



/**
 * addEvent on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navbarToggler = document.querySelector("[data-nav-toggler]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  navbarToggler.classList.toggle("active");
}

addEventOnElem(navbarToggler, "click", toggleNav);

const closeNav = function () {
  navbar.classList.remove("active");
  navbarToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNav);
 
 
 
/**
 * dropdown toggle
 */
 
const dropdownItems = document.querySelectorAll(".has-dropdown");
 
dropdownItems.forEach(item => {
  const link = item.querySelector(".navbar-link");
  link.addEventListener("click", function (e) {
    if (window.innerWidth < 992) {
      e.preventDefault();
      item.classList.toggle("active");
    }
  });
});




/**
 * header active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});
 
 
 

/**
 * before & after slider
 */

const baSliders = document.querySelectorAll("[data-ba-slider]");

baSliders.forEach(slider => {
  const container = slider.querySelector(".ba-image-container");
  const afterContainer = slider.querySelector(".after-container");
  const afterImage = slider.querySelector(".after");
  const handle = slider.querySelector(".ba-handle");

  // Set the after image width to the container's width on load/resize
  const setAfterImageWidth = () => {
    afterImage.style.width = `${container.offsetWidth}px`;
  };

  setAfterImageWidth();
  window.addEventListener("resize", setAfterImageWidth);

  const onMove = (event) => {
    const rect = container.getBoundingClientRect();
    let x = (event.pageX || event.touches[0].pageX) - rect.left - window.scrollX;

    // Boundary checks
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const percent = (x / rect.width) * 100;
    afterContainer.style.width = `${percent}%`;
    handle.style.left = `${percent}%`;
  };

  const startDragging = (e) => {
    e.preventDefault();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchend", stopDragging);
  };

  const stopDragging = () => {
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("touchmove", onMove);
    window.removeEventListener("mouseup", stopDragging);
    window.removeEventListener("touchend", stopDragging);
  };

  // Dragging the handle or clicking the container
  handle.addEventListener("mousedown", startDragging);
  handle.addEventListener("touchstart", startDragging);
  container.addEventListener("click", onMove);
});