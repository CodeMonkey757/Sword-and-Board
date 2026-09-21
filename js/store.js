/* =====================================================
   FILE: js/store.js
   PURPOSE: Builds the Arcanium store page, displays
            product cards, handles add-to-cart actions,
            and shows user feedback notifications.
===================================================== */


/* =====================================================
   DISPLAY PRODUCTS
   Generates product cards from the products array.
   This keeps the HTML cleaner and makes the store easier
   to update because products are controlled through data.
===================================================== */

function displayProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  let html = "";

  products.forEach((product) => {
    html += `
      <div class="card product-card">
        <div class="card-body">

          <img src="${product.image}" alt="${product.alt}" class="cart-item-img">

          <h3>${product.name}</h3>
          <p><strong>$${product.price.toFixed(2)}</strong></p>
          <p class="product-desc">${product.description}</p>

          <div class="form-row">
            <label for="color-${product.id}">Color</label>
            ${buildSelect(product.colors, "color-" + product.id, product.colors[0])}
          </div>

          <div class="form-row">
            <label for="size-${product.id}">Size</label>
            ${buildSelect(product.sizes, "size-" + product.id, product.sizes[0])}
          </div>

          <div class="form-row">
            <label for="qty-${product.id}">Quantity</label>
            ${buildSelect(product.quantities, "qty-" + product.id, 1)}
          </div>

          <button class="btn" onclick="addToCart(${product.id})">
            Add to Pack
          </button>
        </div>
      </div>
    `;
  });

  productList.innerHTML = html;
}


/* =====================================================
   ADD TO CART
   Reads the user's selected color, size, and quantity.
   Then it saves the selected product into the cart.

   If the same product with the same color and size already
   exists, JavaScript increases the quantity instead of
   creating a duplicate item.
===================================================== */

function addToCart(productId) {
  const product = findProduct(productId);

  const color = document.getElementById("color-" + productId).value;
  const size = document.getElementById("size-" + productId).value;
  const quantity = parseInt(document.getElementById("qty-" + productId).value);

  let cart = getCart();

  const existingItem = cart.find(
    (item) =>
      item.productId === productId &&
      item.color === color &&
      item.size === size
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      alt: product.alt,
      color: color,
      size: size,
      quantity: quantity
    });
  }

  saveCart(cart);

  showCartNotification(productId);
}


/* =====================================================
   CART NOTIFICATION
   Creates a temporary notification when an item is added.
   This gives the user immediate feedback and demonstrates
   JavaScript creating and removing HTML elements dynamically.
===================================================== */

function showCartNotification(productId) {
  const product = findProduct(productId);
  const notification = document.createElement("div");

  notification.className = "cart-notification";
  notification.textContent = `${product.name} added to satchel!`;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 50);

  setTimeout(() => {
    notification.classList.remove("show");

    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 2500);
}