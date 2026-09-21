/* =====================================================
   FILE: js/calculator.js
   PURPOSE: Handles the Quest Cost Calculator page by
            calculating stay costs, guest fees, seasonal
            pricing, package upgrades, discounts, and tax.
===================================================== */


/* =====================================================
   PAGE SETUP
   Waits for the calculator form to be submitted.
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const calculatorForm =
    document.getElementById("calculator-form");

  // Safety check
  if (!calculatorForm) return;


  /* ===================================================
     FORM SUBMISSION EVENT
     Prevents page refresh and calculates totals.
  =================================================== */

  calculatorForm.addEventListener("submit", (event) => {

    event.preventDefault();

    calculateQuestCost();

  });

});


/* =====================================================
   CALCULATE QUEST COST
   Main pricing calculator for the stay booking system.
===================================================== */

function calculateQuestCost() {

  /* ===================================================
     GET USER INPUTS
  =================================================== */

  const roomRate =
    parseFloat(document.getElementById("room").value);

  const checkin =
    new Date(document.getElementById("checkin").value);

  const checkout =
    new Date(document.getElementById("checkout").value);

  const extraGuests =
    parseInt(document.getElementById("guests").value) || 0;

  const discountCode =
    document.getElementById("discount").value.trim();

  const weekendUpgrade =
    document.getElementById("weekendUpgrade").checked;


  /* ===================================================
     DATE CALCULATIONS
     Calculates total nights stayed.
  =================================================== */

  const millisecondsPerDay =
    1000 * 60 * 60 * 24;

  const stayNights =
    Math.ceil((checkout - checkin) / millisecondsPerDay);


  /* ===================================================
     INPUT VALIDATION
  =================================================== */

  if (stayNights <= 0 || isNaN(stayNights)) {

    alert("Please select valid travel dates.");

    return;
  }


  /* ===================================================
     BASE ROOM COST
  =================================================== */

  const roomSubtotal =
    roomRate * stayNights;


  /* ===================================================
     EXTRA GUEST FEES
  =================================================== */

  const guestFee =
    extraGuests * 20 * stayNights;


  /* ===================================================
     SEASONAL FEE
     Adds seasonal pricing during summer months.
  =================================================== */

  let seasonFee = 0;

  const checkinMonth = checkin.getMonth();

  if (
    checkinMonth === 5 ||
    checkinMonth === 6 ||
    checkinMonth === 7
  ) {
    seasonFee = 75;
  }


  /* ===================================================
     PACKAGE UPGRADE
  =================================================== */

  const packageFee =
    weekendUpgrade ? 50 : 0;


  /* ===================================================
     DISCOUNT SYSTEM
  =================================================== */

  let discountAmount = 0;

  if (discountCode.toUpperCase() === "DRAGON10") {

    discountAmount =
      (roomSubtotal + guestFee) * 0.10;
  }


  /* ===================================================
     SUBTOTAL BEFORE TAX
  =================================================== */

  const subtotal =
    roomSubtotal +
    guestFee +
    seasonFee +
    packageFee -
    discountAmount;


  /* ===================================================
     TAX CALCULATION
  =================================================== */

  const taxAmount =
    subtotal * 0.0825;


  /* ===================================================
     FINAL TOTAL
  =================================================== */

  const grandTotal =
    subtotal + taxAmount;


  /* ===================================================
     DISPLAY RESULTS
     Updates the result panel dynamically.
  =================================================== */

  document.getElementById("result")
    .classList.remove("hidden");

  document.getElementById("stayNights")
    .textContent =
      `Length of Stay: ${stayNights} night(s)`;

  document.getElementById("roomSubtotal")
    .textContent =
      `Room Cost: $${roomSubtotal.toFixed(2)}`;

  document.getElementById("guestFee")
    .textContent =
      `Guest Fees: $${guestFee.toFixed(2)}`;

  document.getElementById("seasonFee")
    .textContent =
      `Seasonal Fee: $${seasonFee.toFixed(2)}`;

  document.getElementById("packageFee")
    .textContent =
      `Package Upgrade: $${packageFee.toFixed(2)}`;

  document.getElementById("discountAmount")
    .textContent =
      `Discount: -$${discountAmount.toFixed(2)}`;

  document.getElementById("taxAmount")
    .textContent =
      `Tax: $${taxAmount.toFixed(2)}`;

  document.getElementById("grandTotal")
    .textContent =
      `Grand Total: $${grandTotal.toFixed(2)}`;
}