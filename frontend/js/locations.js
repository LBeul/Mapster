import { initializeMarkers } from './mapService.js';
import { navigateToPrefilledDetails } from './routingService.js';

let locations = [];

const initializeLocations = () => {
  fetch('http://localhost:3003/nonsusloc', {
    cache: 'no-cache',
  })
    .then((response) => response.json())
    .then((storedLocations) => {
      locations = storedLocations;
      refreshLocationsList();
      initializeMarkers(locations);
    });
};

const addLocation = (newLocation) => {
  // TODO: POST to backend, get 201 & ID back
  locations = [...locations, newLocation];
  refreshLocationsList();
};

const removeLocation = (id) => {
  // TODO: DELETE to backend, wait for 204
  locations = locations.filter((l) => l.id != id);
  refreshLocationsList();
};

const updateLocation = (modifiedLocation) => {
  // TODO: PUT to backend, get 201 & ID back
  const { id } = modifiedLocation;
  removeLocation(id);
  locations = [...locations, modifiedLocation];
  refreshLocationsList();
};

const createLocationListItem = (location) => {
  const { title, street, score } = location;

  // Text Elements
  const titleLabel = document.createTextNode(title);
  const addressLabel = document.createTextNode(street);
  const scoreLabel = document.createTextNode(`Score: ${score}`);
  const btnLabel = document.createTextNode('Details');

  // Dom Nodes
  let liTitle = document.createElement('div');
  liTitle.classList.add('li-title');
  liTitle.appendChild(titleLabel);

  let liAddress = document.createElement('div');
  liAddress.classList.add('li-address');
  liAddress.appendChild(addressLabel);

  let liScore = document.createElement('div');
  liScore.classList.add('li-score');
  liScore.appendChild(scoreLabel);

  let detailsBtn = document.createElement('button');
  detailsBtn.classList.add('details-button');
  detailsBtn.appendChild(btnLabel);
  navigateToPrefilledDetails(detailsBtn, location);

  let liNumber = document.createElement('div');
  liNumber.classList.add('li-number');

  let liContent = document.createElement('div');
  liContent.classList.add('li-content');
  liContent.appendChild(liTitle);
  liContent.appendChild(liAddress);
  liContent.appendChild(liScore);
  liContent.appendChild(detailsBtn);

  let listItem = document.createElement('li');
  listItem.appendChild(liNumber);
  listItem.appendChild(liContent);

  return listItem;
};

function refreshLocationsList() {
  // clear existing locationsList
  const locationsList = document.getElementById('locations-list');
  locationsList.innerHTML = '';
  // rebuild sorted locationsList from array
  locations
    .sort((a, b) => (a.id < b.id ? -1 : 1))
    .forEach((loc) => {
      locationsList.appendChild(createLocationListItem(loc));
    });
}

export {
  addLocation,
  removeLocation,
  updateLocation,
  createLocationListItem,
  initializeLocations,
};
