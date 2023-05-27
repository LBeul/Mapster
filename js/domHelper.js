import { navigateToScreenById } from './routingService.js';

const deactivateById = (id) => {
  document.getElementById(id).style.display = 'none';
};
const reactivateById = (id) => {
  document.getElementById(id).style.display = 'flex';
};

const getValueById = (id) => document.getElementById(id).value;

const resetValueById = (id) => {
  document.getElementById(id).value = '';
};

const activateAdminControls = () => {
  document.querySelectorAll('.edit-button').forEach((element) => {
    element.style.display = 'flex';
    element.onclick = (e) => navigateToScreenById('update-screen');
  });
  reactivateById('add-location-btn');
};

const revokeAdminControls = () => {
  document.querySelectorAll('.edit-button').forEach((element) => {
    element.style.display = 'none';
    element.onclick = (e) => navigateToScreenById('update-screen');
  });
  deactivateById('add-location-btn');
};

export {
  deactivateById,
  reactivateById,
  getValueById,
  resetValueById,
  activateAdminControls,
  revokeAdminControls,
};
