const products = [
    {
  id: 1,
  name: "Adventurer’s Tunic",
  price: 18.00,
  description: "A rugged tunic favored by seasoned adventurers. Durable, comfortable, and ready for any quest.",
  image: "images/adventurers_tunic.jpg",
  alt: "Adventurer's Tunic",
  colors: ["Black", "Blue", "Green"],
  sizes: ["Small", "Medium", "Large"],
  quantities: [1, 2, 3, 4, 5]
},
{
  id: 2,
  name: "Wanderer’s Cloak",
  price: 32.00,
  description: "A weathered cloak designed for long journeys. Offers warmth, concealment, and a touch of mystery.",
  image: "images/wanderers_cloak.jpg",
  alt: "Wanderer's Cloak",
  colors: ["Gray", "Maroon"],
  sizes: ["Small", "Medium", "Large"],
  quantities: [1, 2, 3, 4, 5]
},
{
  id: 3,
  name: "Ranger’s Field Cap",
  price: 14.00,
  description: "Lightweight and practical, this cap shields the eyes and marks you as a watcher of the wilds.",
  image: "images/rangers_cap.jpg",
  alt: "Ranger's Field Cap",
  colors: ["Black", "Khaki", "Red"],
  sizes: ["One Size"],
  quantities: [1, 2, 3, 4, 5]
},
{
  id: 4,
  name: "Wayfarer’s Pack",
  price: 39.00,
  description: "A sturdy pack built to carry essentials across great distances. Trusted by travelers and explorers alike.",
  image: "images/wayfarers_pack.jpg",
  alt: "Wayfarer's Pack",
  colors: ["Black", "Olive", "Tan"],
  sizes: ["Standard"],
  quantities: [1, 2, 3, 4, 5]
},
{
  id: 5,
  name: "Arcane Flask",
  price: 16.00,
  description: "Keeps your drink at the perfect temperature. Some say it holds more than it should…",
  image: "images/arcane_flask.jpg",
  alt: "Arcane Flask",
  colors: ["Silver", "Blue", "Purple"],
  sizes: ["20 oz", "32 oz"],
  quantities: [1, 2, 3, 4, 5]
},
{
  id: 6,
  name: "Tavern Tankard",
  price: 19.99,
  description: "A classic tankard fit for any hero. Ideal for celebrating victories or planning the next adventure.",
  image: "images/tavern_tankard.jpg",
  alt: "Tavern Tankard",
  colors: ["Black", "Maroon"],
  sizes: ["16 oz"],
  quantities: [1, 2, 3, 4, 5]
}
];


/* =====================================================
   FILE: js/cart-data.js
   PURPOSE: Handles cart storage and retrieval using
            browser localStorage.

            This file acts as the shared data system
            for the store, cart, and checkout pages.
===================================================== */


/* =====================================================
   GET CART
   Retrieves saved cart data from localStorage.

   If no cart data exists yet, JavaScript returns
   an empty array instead.
===================================================== */

function getCart() {

  return JSON.parse(
    localStorage.getItem("cart")
  ) || [];

}


/* =====================================================
   SAVE CART
   Converts cart data into JSON format and stores it
   inside browser localStorage.

   This allows cart data to persist between pages.
===================================================== */

function saveCart(cart) {

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

}


/* =====================================================
   CLEAR CART
   Completely removes cart data from localStorage.
===================================================== */

function clearCart() {

  localStorage.removeItem("cart");

}