import { isAdmin, isValidUserData } from './authService.js';
import {
  activateAdminControls,
  getValueById,
  resetValueById,
  revokeAdminControls,
} from './domHelper.js';
import { removeLocation } from './locations.js';
import {
  addLocation,
  getIncrementalID,
  nukeAndRebuildLocationsList,
  updateLocation,
} from './locations.js';
import {
  addLocationMarker,
  deleteLocationMarker,
  updateLocationMarker,
} from './mapService.js';
import { navigateOnClick, navigateToScreenById } from './routingService.js';

// Initialize SPA
window.onload = () => {
  navigateToScreenById('login-screen');
  // Initial load of stored Locations
  nukeAndRebuildLocationsList();
  // Form Bindings
  document.getElementById('login-form').onsubmit = clickLogin;
  document.getElementById('add-loc-form').onsubmit = clickAddLocation;
  document.getElementById('update-loc-form').onsubmit = clickModifyLocation;
  // Button Bindings
  navigateOnClick('add-location-btn', 'add-screen');
  document.getElementById('logout').onclick = clickLogout;
  document.querySelectorAll('.back-to-main').forEach((element) => {
    element.onclick = (e) => navigateToScreenById('main-screen');
  });
  document.getElementById('delete-btn').onclick = clickDeleteLocation;
};

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

const clickModifyLocation = (event) => {
  event.preventDefault();
  const id = document.getElementById('hidden-id-field').innerText;
  const title = getValueById('modify-title');
  const description = getValueById('modify-description');
  const street = getValueById('modify-street');
  const zipCode = getValueById('modify-zipcode');
  const lat = getValueById('modify-latitude');
  const lon = getValueById('modify-longitude');
  const score = getValueById('modify-pollution');

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
  updateLocation(newLocation);
  updateLocationMarker(newLocation);
  navigateToScreenById('main-screen');
};

const clickDeleteLocation = (event) => {
  event.preventDefault();
  const id = document.getElementById('hidden-id-field').innerText;
  removeLocation(id);
  deleteLocationMarker(id);
  navigateToScreenById('main-screen');
};
