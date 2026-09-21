/* =====================================================
   FILE: js/cart.js
   PURPOSE: Controls the shopping cart page by displaying
            cart items, calculating totals, and allowing
            users to remove items from the cart.
===================================================== */


/* =====================================================
   DISPLAY CART PAGE
   Reads cart data and dynamically builds the cart page.
===================================================== */

function displayCartPage() {

  const cartArea = document.getElementById("cart-area");

  // Safety check
  if (!cartArea) return;

  const cart = getCart();


  /* ===================================================
     EMPTY CART CHECK
     Displays a message if the cart is empty.
  =================================================== */

  if (cart.length === 0) {

    cartArea.innerHTML = `
      <div class="empty-cart">
        <h2>Your satchel is empty.</h2>
        <p>Visit the Arcanium to gather supplies.</p>
      </div>
    `;

    return;
  }

  let html = "";
  let total = 0;


  /* ===================================================
     BUILD CART ITEMS
     JavaScript dynamically creates a card for each
     saved cart item.
  =================================================== */

  cart.forEach((item, index) => {

    const itemTotal = item.price * item.quantity;

    total += itemTotal;

    html += `
      <div class="cart-card">

        <img
          src="${item.image}"
          alt="${item.alt}"
          class="cart-item-img"
        >

        <h2 class="cart-item-title">
          ${item.name}
        </h2>

        <p class="cart-row">
          Color: ${item.color}
        </p>

        <p class="cart-row">
          Size: ${item.size}
        </p>

        <p class="cart-row">
          Quantity: ${item.quantity}
        </p>

        <p class="cart-row">
          Price: $${item.price.toFixed(2)}
        </p>

        <p class="cart-row">
          Item Total: $${itemTotal.toFixed(2)}
        </p>

        <button
          class="remove-button"
          onclick="removeCartItem(${index})"
        >
          Remove Item
        </button>

      </div>
    `;
  });


  /* ===================================================
     DISPLAY FINAL TOTAL
  =================================================== */

  html += `
    <div class="total-box">
      <h2>Total: $${total.toFixed(2)}</h2>
    </div>
  `;

  cartArea.innerHTML = html;
}


/* =====================================================
   REMOVE CART ITEM
   Removes a selected item from the cart array and
   refreshes the cart display.
===================================================== */

function removeCartItem(index) {

  let cart = getCart();

  cart.splice(index, 1);

  saveCart(cart);

  displayCartPage();
}