let locations = [
  {
    id: 1,
    title: '',
    lat: 0,
    lon: 0,
    description: '',
    impactFactor: 5,
  },
];

const addLocation = ({ title, lat, lon, description, impactFactor }) => {
  const id = Math.floor(Math.random() * 10000);
  const newLocation = {
    id,
    title,
    lat,
    lon,
    description,
    impactFactor,
  };
  locations = [...locations, newLocation];
  // update dom
};

const removeLocation = (id) => {
  locations = locations.filter((l) => l.id !== id);
  // update dom
};

const updateLocation = (modifiedLocation) => {
  const { id } = modifiedLocation;
  removeLocation(id);
  locations = [locations, ...modifiedLocation];
  // update dom
};

export { addLocation, removeLocation, updateLocation, locations };
