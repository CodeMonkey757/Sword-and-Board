/* =====================================================
   FILE: js/ravenform.js
   PURPOSE: Controls the Send a Raven form animation.
            JavaScript prevents the default form refresh
            and triggers a sequence of visual effects.
===================================================== */


/* =====================================================
   PAGE SETUP
   Waits for the HTML page to fully load before
   JavaScript attempts to access page elements.
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const ravenForm = document.getElementById("contact-form");
  const scrollShell = document.getElementById("scroll-shell");
  const confirmation = document.getElementById("raven-confirmation");
  const ravenFlight = document.getElementById("raven-flight");


  /* ===================================================
     SAFETY CHECK
     Prevents JavaScript errors if page elements are
     missing from the HTML.
  =================================================== */

  if (!ravenForm || !scrollShell || !confirmation || !ravenFlight) {
    return;
  }


  /* ===================================================
     FORM SUBMISSION EVENT
     Prevents normal form submission and instead
     triggers a custom animation sequence.
  =================================================== */

  ravenForm.addEventListener("submit", (event) => {

    event.preventDefault();


    /* =================================================
       ANIMATION SEQUENCE
       JavaScript adds CSS classes over time to create
       the scroll and raven animation effect.
    ================================================= */

    // Begins submitted state
    scrollShell.classList.add("is-submitted");


    // Scroll begins rolling
    setTimeout(() => {
      scrollShell.classList.add("is-rolling");
    }, 500);


    // Ribbon appears
    setTimeout(() => {
      scrollShell.classList.add("has-ribbon");
    }, 1300);


    // Wax seal appears
    setTimeout(() => {
      scrollShell.classList.add("has-seal");
    }, 1700);


    // Scroll gets picked up
    setTimeout(() => {
      scrollShell.classList.add("is-picked-up");
    }, 2100);


    // Raven flight animation begins
    setTimeout(() => {
      ravenFlight.classList.add("is-flying");
    }, 2300);


    // Final confirmation message appears
    setTimeout(() => {
      confirmation.classList.add("show");
    }, 4200);

  });

});