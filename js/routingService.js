import { deactivateById, reactivateById } from './domHelper.js';

const navigateToScreenById = (selectedScreen, isAdmin) => {
  const screens = [
    'main-screen',
    'add-screen',
    'update-screen',
    'login-screen',
  ];

  screens
    .filter((screen) => screen != selectedScreen)
    .forEach((id) => deactivateById(id));

  reactivateById(selectedScreen);
};

const navigateOnClick = (id, destination) => {
  document.getElementById(id).onclick = (e) =>
    navigateToScreenById(destination);
};

export { navigateToScreenById, navigateOnClick };
