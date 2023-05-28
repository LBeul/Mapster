import { navigateToScreenById } from './routingService.js';

const deactivateById = (id) => {
  document.getElementById(id).style.display = 'none';
};
const reactivateById = (id) => {
  document.getElementById(id).style.display = 'flex';
};
const disabledById = (id) => {
  document.getElementById(id).disabled = true;
};
const enabledById = (id) => {
  document.getElementById(id).disabled = false;
};

const getValueById = (id) => document.getElementById(id).value;

const resetValueById = (id) => {
  document.getElementById(id).value = '';
};

const activateAdminControls = () => {
  reactivateById('add-location-btn');
  enabledById('modify-name');
  enabledById('modify-description');
  enabledById('modify-street');
  enabledById('modify-zipcode');
  enabledById('modify-city');
  enabledById('modify-latitude');
  enabledById('modify-longitude');
  enabledById('modify-picture');
  enabledById('modify-pollution');
  reactivateById('modify-btn');
};

const revokeAdminControls = () => {
  deactivateById('add-location-btn');
  disabledById('modify-name');
  disabledById('modify-description');
  disabledById('modify-street');
  disabledById('modify-zipcode');
  disabledById('modify-city');
  disabledById('modify-latitude');
  disabledById('modify-longitude');
  disabledById('modify-picture');
  disabledById('modify-pollution');
  deactivateById('modify-btn');
};

export {
  deactivateById,
  reactivateById,
  getValueById,
  resetValueById,
  activateAdminControls,
  revokeAdminControls,
};
