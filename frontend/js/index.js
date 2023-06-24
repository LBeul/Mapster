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
import { initializeLocations, removeLocation } from './locations.js';

import { deleteLocationMarker } from './mapService.js';
import { sendAuthRequest } from './requestHelper.js';
import { navigateOnClick, navigateToScreenById } from './routingService.js';

// Initialize SPA
window.onload = () => {
  navigateToScreenById('login-screen');
  // Initial load of stored Locations;
  initializeLocations();
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

  sendAuthRequest(username, password)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Login data is invalid!');
      }
      return response.json();
    })
    .then((data) => {
      const { isAdmin } = data;
      if (isAdmin) {
        activateAdminControls();
      } else {
        revokeAdminControls();
      }
      navigateToScreenById('main-screen');
    })
    .catch((error) => alert(error));

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
