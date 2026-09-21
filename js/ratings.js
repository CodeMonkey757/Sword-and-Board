// ========================================
// FILE: js/ratings.js
// LOCATION: project_mray/js/ratings.js
// PURPOSE:
// - Handles clickable star ratings
// - Displays existing reviews from a JS array
// - Adds new submitted review to top of list
// - Shows a custom confirmation window
// - Resets form after submission
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  // ========================================
  // SECTION: Grab page elements
  // PURPOSE: Connect JS to HTML elements
  // ========================================
  const stars = document.querySelectorAll(".star-rating span");
  const ratingInput = document.getElementById("rating");
  const ratingForm = document.getElementById("ratingForm");

  const reviewsList = document.getElementById("reviewsList");

  const ratingConfirmation = document.getElementById("ratingConfirmation");
  const confirmationMessage = document.getElementById("confirmationMessage");
  const closeConfirmation = document.getElementById("closeConfirmation");

  const reviewCount = document.getElementById("reviewCount");
  const averageRating = document.getElementById("averageRating");

  // Safety check:
  // If important elements are missing, stop the script
  if (
    !stars.length ||
    !ratingInput ||
    !ratingForm ||
    !reviewsList ||
    !ratingConfirmation ||
    !confirmationMessage ||
    !closeConfirmation
  ) {
    return;
  }

  // ========================================
  // SECTION: Starter reviews array
  // PURPOSE: Simulates previously stored reviews
  // NOTE: These display when the page first loads
  // ========================================
  const reviews = [
    {
      guestName: "Elara",
      roomRated: "The Wizard's Tower",
      rating: "5",
      comments: "A magical stay beneath the stars. The tower view was unforgettable."
    },
    {
      guestName: "Thorne",
      roomRated: "Ranger's Roost",
      rating: "4",
      comments: "Quiet, cozy, and perfect after a long road through the wilds."
    },
    {
      guestName: "Mira",
      roomRated: "The Wizard's Tower",
      rating: "5",
      comments: "Beautiful atmosphere, charming details, and a truly enchanted feeling."
    },
    {
      guestName: "Theldor The Mild",
      roomRated: "The Ranger's Roost",
      rating: "3",
      comments: "Fuzzy bed made for weird tickeling of my nose when I slept. The real dip in the stars of your review lie in the spicy level of your Felminda's Famous Fire Chili! I still feel its lingering fires."
    },
    {
      guestName: "Lightning Dan",
      roomRated: "The Wizard's Tower",
      rating: "2",
      comments: "Found the potions cabinate oddly lacking in the beautification potions. The mirror showed a gristly sight and I say one would think hospitality would include such a thing. Scoundles"
    },
    {
      guestName: "Thelinda Bazlindal",
      roomRated: "The Ranger's Roost",
      rating: "3",
      comments: "I think those dice for the House DM are loaded. You are telling me they rolled above a 15 THAT MANY TIMES!?!?!? NO!!!!!!!"
    }
  ];

  // ========================================
  // FUNCTION: renderStars
  // PURPOSE: Returns visible star symbols for reviews
  // EXAMPLE: rating 4 = ★★★★☆
  // ========================================
  function renderStars(ratingValue) {
    const ratingNumber = Number(ratingValue);
    let starDisplay = "";

    for (let i = 1; i <= 5; i++) {
      if (i <= ratingNumber) {
        starDisplay += "★";
      } else {
        starDisplay += "☆";
      }
    }

    return starDisplay;
  }

// ========================================
// FUNCTION: updateReviewStats
// PURPOSE:
// - Shows total number of reviews
// - Calculates average rating
// ========================================
function updateReviewStats() {
  const totalReviews = reviews.length;

  const totalRatingValue = reviews.reduce((sum, review) => {
    return sum + Number(review.rating);
  }, 0);

  const averageValue = totalRatingValue / totalReviews;
  const roundedAverage = Math.round(averageValue);

  reviewCount.textContent = `Tales Recorded: ${totalReviews}`;
  averageRating.innerHTML = `Average Rating: <span class="review-stars">${renderStars(roundedAverage)}</span> (${averageValue.toFixed(1)}/5)`;
}

  // ========================================
  // FUNCTION: renderReviews
  // PURPOSE: Displays all reviews from the array
  // NOTE: Called on page load and after every submit
  // ========================================
  function renderReviews() {
    // Clear old display before rebuilding it
    reviewsList.innerHTML = "";

    // Loop through every review object in the array
    reviews.forEach((review, index) => {
      // Create a review card
      const reviewCard = document.createElement("article");
      reviewCard.classList.add("review-entry");

      // NEWEST REVIEW GLOW
      if (index === 0) {
        reviewCard.classList.add("newest-review");

        reviewCard.innerHTML = `
          <span class="newest-badge">✨ Newest Tale</span>
          <h3>${review.guestName}</h3>
          <p><strong>Room:</strong> ${review.roomRated}</p>
         <p><strong>Rating:</strong> <span class="review-stars">${renderStars(review.rating)}</span></p>
          <p class="review-comment">${review.comments}</p>
        `;
    } else {
      reviewCard.innerHTML = `
        <h3>${review.guestName}</h3>
        <p><strong>Room:</strong> ${review.roomRated}</p>
        <p><strong>Rating:</strong> <span class="review-stars">${renderStars(review.rating)}</span></p>
        <p class="review-comment">${review.comments}</p>
      `;
    }

reviewsList.appendChild(reviewCard);
      reviewsList.appendChild(reviewCard);
    });

    updateReviewStats();
  }

  // ========================================
  // FUNCTION: clearSelectedStars
  // PURPOSE: Removes selected style from all stars
  // ========================================
  function clearSelectedStars() {
    stars.forEach((star) => star.classList.remove("selected"));
  }

  // ========================================
  // SECTION: Handle star clicks
  // PURPOSE:
  // - User clicks a star
  // - Hidden input stores the value
  // - Visual selection updates
  // ========================================
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const value = star.getAttribute("data-value");

      // Store selected value in hidden input
      ratingInput.value = value;

      // Clear old selection styles
      clearSelectedStars();

      // Highlight clicked star and every star above/below as needed
      stars.forEach((s) => {
        if (Number(s.getAttribute("data-value")) <= Number(value)) {
          s.classList.add("selected");
        }
      });
    });
  });

  // ========================================
  // SECTION: Handle form submission
  // PURPOSE:
  // - Prevent page refresh
  // - Validate star selection
  // - Build new review object
  // - Add new review to TOP of array
  // - Re-render reviews
  // - Show custom confirmation box
  // - Reset form and stars
  // ========================================
  ratingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Make sure a star rating was selected
    if (ratingInput.value === "") {
      confirmationMessage.textContent =
        "Please select a rating before submitting your tale.";
      ratingConfirmation.classList.remove("hidden");
      return;
    }

    // Get user form values
    const guestName = document.getElementById("guestName").value.trim();
    const roomRated = document.getElementById("roomRated").value;
    const comments = document.getElementById("comments").value.trim();
    const ratingValue = ratingInput.value;

    // Create review object from form data
    const newReview = {
      guestName: guestName,
      roomRated: roomRated,
      rating: ratingValue,
      comments: comments
    };

    // Add newest review to the TOP of the array
    // unshift() puts it first
    reviews.unshift(newReview);

    // Rebuild the visible reviews list
    renderReviews();

    // Show custom success message
    confirmationMessage.textContent =
      `Thank you, ${guestName}. Your review for ${roomRated} has been added to the guest chronicles.`;

    ratingConfirmation.classList.remove("hidden");

    // Reset the form fields
    ratingForm.reset();

    // Clear hidden rating value
    ratingInput.value = "";

    // Remove star highlight styling
    clearSelectedStars();
  });

  // ========================================
  // SECTION: Close confirmation window
  // PURPOSE: Hides confirmation box when button clicked
  // ========================================
  closeConfirmation.addEventListener("click", () => {
    ratingConfirmation.classList.add("hidden");
  });

  // ========================================
  // SECTION: Initial page load
  // PURPOSE: Show starter reviews immediately
  // ========================================
  renderReviews();
});