/* =====================================================
   FILE: js/gallery.js
   PURPOSE: Powers the Wizard's Tower photo gallery —
            thumbnail swap for the featured image/caption,
            plus a click-to-enlarge lightbox with
            prev/next navigation.

            Content (image src, alt, title, description)
            is read directly from the thumbnail markup in
            the HTML, so updating captions or photos only
            requires editing the data-title / data-description
            attributes on each thumbnail — no JS changes needed.
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById("main-wizard-image");
  const titleEl = document.getElementById("wizard-image-title");
  const textEl = document.getElementById("wizard-image-text");
  const thumbnails = Array.from(document.querySelectorAll(".thumbnail-row img"));

  // Nothing to do if this page doesn't have the gallery markup.
  if (!mainImage || thumbnails.length === 0) return;

  // Build the gallery's image list straight from the thumbnail markup.
  const images = thumbnails.map((thumb) => ({
    src: thumb.getAttribute("src"),
    alt: thumb.getAttribute("alt") || "",
    title: thumb.dataset.title || "",
    description: thumb.dataset.description || "",
  }));

  let currentIndex = Math.max(
    thumbnails.findIndex((t) => t.classList.contains("active-thumbnail")),
    0
  );

  /* ---------------------------------------------------
     FEATURED IMAGE + CAPTION
  --------------------------------------------------- */

  function setActiveImage(index) {
    currentIndex = (index + images.length) % images.length;
    const img = images[currentIndex];

    mainImage.src = img.src;
    mainImage.alt = img.alt;
    if (titleEl) titleEl.textContent = img.title;
    if (textEl) textEl.textContent = img.description;

    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle("active-thumbnail", i === currentIndex);
    });

    // Keep the lightbox in sync if it's open while the user clicks thumbnails.
    if (lightbox.classList.contains("is-open")) {
      updateLightboxContent();
    }
  }

  thumbnails.forEach((thumb, index) => {
    thumb.style.cursor = "pointer";
    thumb.addEventListener("click", () => setActiveImage(index));
  });

  /* ---------------------------------------------------
     LIGHTBOX (click the main image to enlarge)
  --------------------------------------------------- */

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxText = document.getElementById("lightbox-description");
  const closeBtn = document.getElementById("lightbox-close");
  const nextBtn = document.getElementById("lightbox-next");
  const prevBtn = document.getElementById("lightbox-prev");

  if (!lightbox) return; // Lightbox markup not present on this page.

  function updateLightboxContent() {
    const img = images[currentIndex];
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    if (lightboxTitle) lightboxTitle.textContent = img.title;
    if (lightboxText) lightboxText.textContent = img.description;
  }

  function openLightbox() {
    updateLightboxContent();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  mainImage.addEventListener("click", openLightbox);
  mainImage.setAttribute("tabindex", "0");
  mainImage.setAttribute("role", "button");
  mainImage.setAttribute("aria-label", "Click to enlarge photo");
  mainImage.addEventListener("keypress", (e) => {
    if (e.key === "Enter" || e.key === " ") openLightbox();
  });

  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", () => {
    setActiveImage(currentIndex + 1);
    updateLightboxContent();
  });
  prevBtn.addEventListener("click", () => {
    setActiveImage(currentIndex - 1);
    updateLightboxContent();
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") {
      setActiveImage(currentIndex + 1);
      updateLightboxContent();
    }
    if (e.key === "ArrowLeft") {
      setActiveImage(currentIndex - 1);
      updateLightboxContent();
    }
  });
});
