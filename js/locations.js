import { setValueById } from './domHelper.js';
import { navigateToScreenById } from './routingService.js';

let locations = [
  {
    id: 1,
    title: 'Kernkraftwerk',
    lat: 52.52197645,
    lon: 13.413637435864272,
    street: 'Alexanderplatz',
    zipcode: '12488',
    description: 'lorem ipsum dolor sit amet',
    score: 5,
  },
  {
    id: 2,
    title: 'Heizkraftwerk',
    lat: 52.4685507,
    lon: 13.5543359,
    street: 'An der Wuhlheide',
    zipcode: '12488',
    description: 'lorem ipsum dolor sit amet',
    score: 10,
  },
  {
    id: 3,
    title: 'Braunkohlegrube',
    lat: 52.5166047,
    lon: 13.3809897,
    street: 'Unter den Linden',
    zipcode: '12488',
    description: 'lorem ipsum dolor sit amet',
    score: 7,
  },
];

const getIncrementalID = () => Math.max(...locations.map((loc) => loc.id)) + 1;

const addLocation = (newLocation) => {
  locations = [...locations, newLocation];
  nukeAndRebuildLocationsList();
};

const removeLocation = (id) => {
  locations = locations.filter((l) => l.id != id);
  nukeAndRebuildLocationsList();
};

const updateLocation = (modifiedLocation) => {
  const { id } = modifiedLocation;
  removeLocation(id);
  locations = [...locations, modifiedLocation];
  nukeAndRebuildLocationsList();
};

const createLocationListItem = (location) => {
  const { id, title, street, score } = location;

  // Text Elements
  const idLabel = document.createTextNode(`${id}`);
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
  liNumber.appendChild(idLabel);

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

function nukeAndRebuildLocationsList() {
  // nuke
  const locationsList = document.getElementById('locations-list');
  locationsList.innerHTML = '';
  // rebuild
  locations
    .sort((a, b) => (a.id < b.id ? -1 : 1))
    .forEach((loc) => {
      locationsList.appendChild(createLocationListItem(loc));
    });
}

const navigateToPrefilledDetails = (element, location) => {
  element.onclick = (e) => {
    e?.preventDefault();
    const { id, title, description, street, zipcode, lat, lon, score } =
      location;
    setValueById('modify-title', title);
    setValueById('modify-description', description);
    setValueById('modify-street', street);
    setValueById('modify-zipcode', zipcode);
    setValueById('modify-city', 'Berlin');
    setValueById('modify-latitude', lat);
    setValueById('modify-longitude', lon);
    setValueById('modify-pollution', score);
    document.getElementById('hidden-id-field').innerText = id;

    navigateToScreenById('update-screen');
  };
};

export {
  getIncrementalID,
  addLocation,
  removeLocation,
  updateLocation,
  locations,
  createLocationListItem,
  nukeAndRebuildLocationsList,
};
