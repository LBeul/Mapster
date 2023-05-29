import { getIncrementalID } from './locations.js';

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

const setValueById = (id, value) => {
  document.getElementById(id).value = value;
};

const activateAdminControls = () => {
  reactivateById('add-location-btn');
  enabledById('modify-title');
  enabledById('modify-description');
  enabledById('modify-street');
  enabledById('modify-zipcode');
  enabledById('modify-latitude');
  enabledById('modify-longitude');
  enabledById('modify-picture');
  enabledById('modify-pollution');
  reactivateById('modify-btn');
  reactivateById('delete-btn');
};

const revokeAdminControls = () => {
  deactivateById('add-location-btn');
  disabledById('modify-title');
  disabledById('modify-description');
  disabledById('modify-street');
  disabledById('modify-zipcode');
  disabledById('modify-latitude');
  disabledById('modify-longitude');
  disabledById('modify-picture');
  disabledById('modify-pollution');
  deactivateById('modify-btn');
  deactivateById('delete-btn');
};

const resetAddForm = () => {
  resetValueById('add-title');
  resetValueById('add-description');
  resetValueById('add-street');
  resetValueById('add-zipcode');
  resetValueById('add-latitude');
  resetValueById('add-longitude');
  resetValueById('add-picture');
  resetValueById('add-pollution');
};

const getFormValuesById = (formID) => {
  if (formID === 'add-loc-form') {
    const title = getValueById('add-title');
    const description = getValueById('add-description');
    const street = getValueById('add-street');
    const zipCode = getValueById('add-zipcode');
    const lat = getValueById('add-latitude');
    const lon = getValueById('add-longitude');
    const score = getValueById('add-pollution');
    const id = getIncrementalID();
    return { title, description, street, zipCode, lat, lon, score, id };
  } else if (formID === 'update-loc-form') {
    const id = document.getElementById('hidden-id-field').innerText;
    const title = getValueById('modify-title');
    const description = getValueById('modify-description');
    const street = getValueById('modify-street');
    const zipCode = getValueById('modify-zipcode');
    const lat = getValueById('modify-latitude');
    const lon = getValueById('modify-longitude');
    const score = getValueById('modify-pollution');
    return { title, description, street, zipCode, lat, lon, score, id };
  }
};

export {
  deactivateById,
  reactivateById,
  getValueById,
  resetValueById,
  setValueById,
  activateAdminControls,
  revokeAdminControls,
  resetAddForm,
  getFormValuesById,
};
