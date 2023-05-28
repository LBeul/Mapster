import { isAdmin, isValidUserData } from './authService.js';
import {
  activateAdminControls,
  getValueById,
  resetValueById,
  revokeAdminControls,
} from './domHelper.js';
import {
  addLocation,
  getIncrementalID,
  nukeAndRebuildLocationsList,
} from './locations.js';
import { addLocationMarker } from './mapService.js';
import { navigateOnClick, navigateToScreenById } from './routingService.js';

// Starting
window.onload = initializeSPA;

function initializeSPA() {
  // Start at login-screen
  navigateToScreenById('login-screen');

  // Initial load of stored Locations
  nukeAndRebuildLocationsList();

  // Form Bindings
  document.getElementById('login-form').onsubmit = clickLogin;
  document.getElementById('add-loc-form').onsubmit = clickAddLocation;

  // Button Bindings
  navigateOnClick('add-location-btn', 'add-screen');
  document.getElementById('logout').onclick = clickLogout;
  document.querySelectorAll('.back-to-main').forEach((element) => {
    element.onclick = (e) => navigateToScreenById('main-screen');
  });
}

const clickLogin = (event) => {
  event.preventDefault();
  const username = getValueById('username');
  const password = getValueById('password');
  if (isValidUserData(username, password)) {
    navigateToScreenById('main-screen');
    if (isAdmin(username)) {
      activateAdminControls();
    }
  } else {
    alert('The provided credential combination does not exist');
  }
  resetValueById('username');
  resetValueById('password');
};

const clickLogout = (event) => {
  event.preventDefault();
  navigateToScreenById('login-screen');
  revokeAdminControls();
};

const clickAddLocation = (event) => {
  event.preventDefault();
  const title = getValueById('add-title');
  const description = getValueById('add-description');
  const street = getValueById('add-street');
  const zipCode = getValueById('add-zipcode');
  const lat = getValueById('add-latitude');
  const lon = getValueById('add-longitude');
  const picture = getValueById('add-picture');
  const score = getValueById('add-pollution');
  const id = getIncrementalID();
  const newLocation = {
    id,
    title,
    lat,
    lon,
    street,
    zipCode,
    description,
    score,
  };
  addLocation(newLocation);
  addLocationMarker(newLocation);
  navigateToScreenById('main-screen');
  resetValueById('add-title');
  resetValueById('add-description');
  resetValueById('add-street');
  resetValueById('add-zipcode');
  resetValueById('add-latitude');
  resetValueById('add-longitude');
  resetValueById('add-picture');
  resetValueById('add-pollution');
};
