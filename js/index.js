import { isAdmin, isValidUserData } from './authService.js';
import {
  activateAdminControls,
  getValueById,
  reactivateById,
  resetValueById,
  revokeAdminControls,
} from './domHelper.js';
import { navigateOnClick, navigateToScreenById } from './routingService.js';

// Starting
window.onload = initializeSPA;

function initializeSPA() {
  navigateToScreenById('login-screen');

  // Form Bindings
  document.getElementById('login-form').onsubmit = clickLogin;

  // Button Bindings
  navigateOnClick('add-location-btn', 'add-screen');
  document.getElementById('logout').onclick = clickLogout;
  document.querySelectorAll('.back-to-main').forEach((element) => {
    element.onclick = (e) => navigateToScreenById('main-screen');
  });
  document.querySelectorAll('.details-button').forEach((element) => {
    element.onclick = (e) => navigateToScreenById('update-screen');
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
