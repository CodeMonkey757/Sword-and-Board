/* =====================================================
   FILE: js/gallery.js
   PURPOSE: Controls the interactive room gallery
            for the Sword & Board room pages.

            JavaScript updates the main display image
            when users interact with gallery thumbnails
            or navigation controls.
===================================================== */


/* =====================================================
   GALLERY IMAGE DATA
   Stores all gallery image paths in an array so the
   gallery can be managed from one central location.
===================================================== */

const galleryImages = [
  "images/wizard1.jpg",
  "images/wizard2.jpg",
  "images/wizard3.jpg",
  "images/wizard4.jpg",
  "images/wizard5.jpg",
  "images/wizard6.jpg"
];


/* =====================================================
   CURRENT IMAGE TRACKING
   Keeps track of which image is currently displayed.
===================================================== */

let currentImageIndex = 0;


/* =====================================================
   DISPLAY MAIN IMAGE
   Updates the featured gallery image dynamically.
===================================================== */

function displayMainImage(index) {

  const mainImage = document.getElementById("main-room-image");

  // Safety check
  if (!mainImage) return;

  mainImage.src = galleryImages[index];

  currentImageIndex = index;
}


/* =====================================================
   NEXT IMAGE
   Moves forward through the gallery images.
   Loops back to the beginning when reaching the end.
===================================================== */

function nextImage() {

  currentImageIndex++;

  if (currentImageIndex >= galleryImages.length) {
    currentImageIndex = 0;
  }

  displayMainImage(currentImageIndex);
}


/* =====================================================
   PREVIOUS IMAGE
   Moves backward through the gallery images.
===================================================== */

function previousImage() {

  currentImageIndex--;

  if (currentImageIndex < 0) {
    currentImageIndex = galleryImages.length - 1;
  }

  displayMainImage(currentImageIndex);
}


/* =====================================================
   THUMBNAIL INTERACTION
   Allows users to directly select a gallery image.
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const thumbnails = document.querySelectorAll(".gallery-thumb");

  thumbnails.forEach((thumbnail, index) => {

    thumbnail.addEventListener("click", () => {

      displayMainImage(index);

    });

  });

});