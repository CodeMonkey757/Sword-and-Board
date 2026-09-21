/* =====================================================
   FILE: js/checkout.js
   PURPOSE: Controls the checkout and shipping page,
            displays the order summary, and handles
            simulated order submission.
===================================================== */


/* =====================================================
   INITIALIZE SHIPPING PAGE
   Runs when the checkout page loads and prepares
   the page functionality.
===================================================== */

function initShippingPage() {

  displayOrderSummary();
  setupShippingForm();

}


/* =====================================================
   DISPLAY ORDER SUMMARY
   Reads cart data and dynamically creates the
   checkout summary displayed on the page.
===================================================== */

function displayOrderSummary() {

  const summaryContainer =
    document.getElementById("shipping-summary");

  // Safety check
  if (!summaryContainer) return;

  const cart = getCart();

  let html = "";
  let total = 0;


  /* ===================================================
     BUILD SUMMARY ITEMS
     Creates display information for each cart item.
  =================================================== */

  cart.forEach((item) => {

    const itemTotal = item.price * item.quantity;

    total += itemTotal;

    html += `
      <p>
        ${item.name}
        (${item.color} / ${item.size})
        × ${item.quantity}
      </p>

      <p>$${itemTotal.toFixed(2)}</p>

      <hr>
    `;
  });


  /* ===================================================
     DISPLAY FINAL TOTAL
  =================================================== */

  html += `
    <h3>Total: $${total.toFixed(2)}</h3>
  `;

  summaryContainer.innerHTML = html;
}


/* =====================================================
   SHIPPING FORM SETUP
   Handles the shipping form submission process.
===================================================== */

function setupShippingForm() {

  const shippingForm =
    document.getElementById("shipping-form");

  const shippingMessage =
    document.getElementById("shipping-message");

  // Safety check
  if (!shippingForm || !shippingMessage) return;


  /* ===================================================
     FORM SUBMISSION EVENT
     Prevents page refresh and simulates order dispatch.
  =================================================== */

  shippingForm.addEventListener("submit", (event) => {

    event.preventDefault();


    /* ===============================================
       CONFIRMATION MESSAGE
       Displays successful dispatch feedback.
    =============================================== */

    shippingMessage.innerHTML = `
      <p class="success-message">
        Your order has been dispatched successfully!
      </p>
    `;


    /* ===============================================
       CLEAR CART DATA
       Removes cart data after successful checkout.
    =============================================== */

    clearCart();

    shippingForm.reset();

  });

}