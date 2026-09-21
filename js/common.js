/* =====================================================
   FILE: js/common.js
   PURPOSE: Stores shared JavaScript functionality used
            across multiple Sword & Board pages.

            This file improves consistency and prevents
            duplicate code throughout the website.
===================================================== */


/* =====================================================
   MOBILE NAVIGATION MENU
   Controls the hamburger menu behavior on smaller
   screen sizes.
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");


  /* ===================================================
     SAFETY CHECK
     Prevents JavaScript errors if elements are missing.
  =================================================== */

  if (!hamburger || !navLinks) {
    return;
  }


  /* ===================================================
     HAMBURGER BUTTON EVENT
     Opens and closes the mobile navigation menu.
  =================================================== */

  hamburger.addEventListener("click", () => {

    navLinks.classList.toggle("nav-open");


    /* ===============================================
       ICON CHANGE
       Changes the hamburger icon depending on menu state.
    =============================================== */

    if (navLinks.classList.contains("nav-open")) {
      hamburger.textContent = "✕";
    } else {
      hamburger.textContent = "☰";
    }

  });

});


/* =====================================================
   FIND PRODUCT
   Searches the products array and returns the matching
   product object using the product ID.
===================================================== */

function findProduct(productId) {

  return products.find(
    (product) => product.id === productId
  );

}


/* =====================================================
   BUILD SELECT MENU
   Dynamically generates reusable dropdown menus.

   This reduces repeated HTML and improves organization.
===================================================== */

function buildSelect(options, id, selectedValue) {

  let html = `<select id="${id}">`;

  options.forEach((option) => {

    html += `
      <option value="${option}"
        ${option == selectedValue ? "selected" : ""}>
        ${option}
      </option>
    `;

  });

  html += `</select>`;

  return html;
}