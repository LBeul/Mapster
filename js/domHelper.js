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

export { deactivateById, reactivateById, getValueById, resetValueById };
