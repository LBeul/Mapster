import { deactivateById, reactivateById } from './domHelper.js';

const navigateToScreenById = (selectedScreen) => {
  const screens = [
    'main_screen',
    'add_screen',
    'update_screen',
    'login_screen',
  ];

  screens
    .filter((screen) => screen != selectedScreen)
    .forEach((id) => deactivateById(id));

  reactivateById(selectedScreen);
};

export { navigateToScreenById };
