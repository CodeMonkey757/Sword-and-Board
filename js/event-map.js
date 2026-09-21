"use strict";

/* =====================================================
   FILE: js/event-map.js
   PURPOSE: Controls the interactive event map on the
            Events page using the Google Maps API.

            This file demonstrates JavaScript working
            with an external API to display a live,
            styled map instead of a static image.
===================================================== */


/* =====================================================
   INITIALIZE EVENT MAP
   This function is called by the Google Maps API callback
   in events.html.

   IMPORTANT:
   The function name must match the callback name:
   callback=initEventMap
===================================================== */

function initEventMap() {
  const location = {
    lat: 32.7767,
    lng: -96.7970
  };

    /* ===================================================
     EVENT LOCATION DATA
     Stores the latitude and longitude for the map marker.
     Keeping the location in a variable makes it reusable
     for both the map center and the marker position.
  =================================================== */

  // your existing location variable/code stays here


  /* ===================================================
     CREATE GOOGLE MAP
     JavaScript connects to the Google Maps API and
     renders the map inside the #event-map HTML element.
  =================================================== */

  // your existing map creation code stays here


  /* ===================================================
     CUSTOM MAP STYLING
     These style settings help the map match the
     Sword & Board neon gothic/fantasy theme.
  =================================================== */

  // your existing styles array/code stays here


  /* ===================================================
     MAP MARKER
     Places a marker on the map to show the event location.
  =================================================== */
  
  const map = new google.maps.Map(
    document.getElementById("event-map"),
    {
      zoom: 13,
      center: location,
      styles: [
        {
          elementType: "geometry",
          stylers: [{ color: "#1b1b1b" }]
        },
        {
          elementType: "labels.text.fill",
          stylers: [{ color: "#00ffe0" }]
        }
      ]
    }
  );

  new google.maps.Marker({
    position: location,
    map: map,
    title: "Sword & Board Gathering Hall"
  });
}