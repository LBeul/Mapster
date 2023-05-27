import { isValidUserData } from './authService.js';
import { getValueById, resetValueById } from './domHelper.js';
import { navigateToScreenById } from './routingService.js';

// Starting
window.onload = initializeSPA;

function initializeSPA() {
  navigateToScreenById('login_screen');

  document.getElementById('login_form').onsubmit = clickLogin;
  document.getElementById('navigate_to_add').onclick = (e) =>
    navigateToScreenById('add_screen');
}

const clickLogin = (event) => {
  event.preventDefault();
  const username = getValueById('username');
  const password = getValueById('password');
  if (isValidUserData(username, password)) {
    navigateToScreenById('main_screen');
  } else {
    alert('The provided credential combination does not exist');
  }
  resetValueById('username');
  resetValueById('password');
};
