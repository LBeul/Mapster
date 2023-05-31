import { isAdmin, isValidUserData } from './authService.js';
import {
  activateAdminControls,
  getFormValuesById,
  getValueById,
  resetValueById,
  revokeAdminControls,
} from './domHelper.js';
import {
  getAddressAndAddLocation,
  getAddressAndUpdateLocation,
  getCoordsAndAddLocation,
  getCoordsAndUpdateLocation,
} from './geoService.js';
import { removeLocation } from './locations.js';
import { refreshLocationsList } from './locations.js';
import { deleteLocationMarker } from './mapService.js';
import { navigateOnClick, navigateToScreenById } from './routingService.js';

// Initialize SPA
window.onload = () => {
  navigateToScreenById('login-screen');
  // Initial load of stored Locations
  refreshLocationsList();
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
    } else {
      revokeAdminControls();
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
  const locationInput = getFormValuesById('add-loc-form');
  const hasAdress = locationInput.street && locationInput.zipCode;
  const hasCoords = locationInput.lat && locationInput.lon;

  if (hasAdress) {
    getCoordsAndAddLocation(locationInput);
  } else if (hasCoords) {
    getAddressAndAddLocation(locationInput);
  } else {
    alert('Bitte entweder Straße und PLZ oder Längen-/Breitengrad eintragen.');
  }
};

const clickModifyLocation = (event) => {
  event.preventDefault();
  const locationInput = getFormValuesById('update-loc-form');
  const hasAdress = locationInput.street && locationInput.zipCode;
  const hasCoords = locationInput.lat && locationInput.lon;
  if (hasAdress) {
    getCoordsAndUpdateLocation(locationInput);
  } else if (hasCoords) {
    getAddressAndUpdateLocation(locationInput);
  } else {
    alert('Bitte entweder Straße und PLZ oder Längen-/Breitengrad eintragen.');
  }
};

const clickDeleteLocation = (event) => {
  event.preventDefault();
  const id = document.getElementById('hidden-id-field').innerText;
  removeLocation(id);
  deleteLocationMarker(id);
  navigateToScreenById('main-screen');
};
