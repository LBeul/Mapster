const map = L.map('map').setView([52.521, 13.413], 10);
const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

let markers = [];

const initializeMarkers = (locations) => {
  markers = locations.map((loc) => {
    const { id, lat, lon, title, street, score } = loc;
    const marker = L.marker([lat, lon]).addTo(map);
    marker.bindPopup(formatPopup(title, street, score));
    return { id, marker };
  });
};

function formatPopup(title, street, score) {
  return `<h3>${title}</h3><p>${street}</p><h5>Score: ${score ?? '--'}</h5>`;
}

const addLocationMarker = (loc) => {
  const { id, lat, lon, title, street, score } = loc;
  const marker = L.marker([lat, lon]).addTo(map);
  marker.bindPopup(formatPopup(title, street, score));
  markers = [...markers, { id, marker }];
};

const updateLocationMarker = (location) => {
  const oldMarker = markers.find((m) => m.id == location.id);
  map.removeLayer(oldMarker.marker);

  markers = markers.filter((m) => m.id != location.id);
  addLocationMarker(location);
};

const deleteLocationMarker = (locationID) => {
  const oldMarker = markers.find((m) => m.id == locationID);
  markers = markers.filter((m) => m.id != locationID);
  map.removeLayer(oldMarker.marker);
};

export {
  initializeMarkers,
  addLocationMarker,
  updateLocationMarker,
  deleteLocationMarker,
};
