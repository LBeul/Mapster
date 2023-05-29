import { isAdmin, isValidUserData } from './authService.js';
import {
  activateAdminControls,
  getFormValuesById,
  getValueById,
  resetAddForm,
  resetValueById,
  revokeAdminControls,
} from './domHelper.js';
import { removeLocation } from './locations.js';
import {
  addLocation,
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

const getCoordsAndAddLocation = (locationWithoutCoords) => {
  const { street, zipCode } = locationWithoutCoords;
  const addressString = `${street}, ${zipCode} Berlin`;
  const url = `https://nominatim.openstreetmap.org/search?q=${addressString}&format=json`;

  fetch(url)
    .then((response) => response.json())
    .catch((err) => console.log('Connecting to ' + url + ' failed!'))
    .then((geoData) => {
      const { lat, lon } = geoData[0];
      const newLocation = { ...locationWithoutCoords, lat, lon };
      console.log(newLocation);
      addLocation(newLocation);
      addLocationMarker(newLocation);
      navigateToScreenById('main-screen');
      resetAddForm();
    });
};

const getAddressAndAddLocation = (locationWithoutAddress) => {
  const { lat, lon } = locationWithoutAddress;
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

  fetch(url)
    .then((response) => response.json())
    .catch((err) => console.log('Connecting to ' + url + ' failed!'))
    .then((geoData) => {
      const { road, city, postcode } = geoData.address;
      if (city !== 'Berlin') {
        console.log(city);
        alert('Gegebene Koordinaten liegen außerhalb Berlins.');
      } else {
        const newLocation = {
          ...locationWithoutAddress,
          street: road,
          zipcode: postcode,
        };
        console.log(newLocation);
        addLocation(newLocation);
        addLocationMarker(newLocation);
        navigateToScreenById('main-screen');
        resetAddForm();
      }
    });
};

const clickModifyLocation = (event) => {
  event.preventDefault();
  const newLocation = getFormValuesById('update-loc-form');
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
