import { resetAddForm } from './domHelper.js';
import { addLocation, updateLocation } from './locations.js';
import { addLocationMarker, updateLocationMarker } from './mapService.js';
import { navigateToScreenById } from './routingService.js';

const getCoordsAndAddLocation = (locationWithoutCoords) => {
  const { street, zipCode } = locationWithoutCoords;
  const addressString = `${street}, ${zipCode} Berlin`;
  const url = `https://nominatim.openstreetmap.org/search?q=${addressString}&format=json`;

  fetch(url)
    .then((response) => response.json())
    .catch((err) => console.log(`Verbindung mit ${url} fehlgeschlagen!`))
    .then((geoData) => {
      const locEntry = geoData?.[0];
      if (!locEntry?.lat) {
        alert('Die angegebenen Adresse wurde nicht gefunden.');
      } else {
        const { lat, lon } = locEntry;
        const newLocation = { ...locationWithoutCoords, lat, lon };
        console.log('Added:', newLocation);
        addLocation(newLocation);
        addLocationMarker(newLocation);
        navigateToScreenById('main-screen');
        resetAddForm();
      }
    });
};

const getAddressAndAddLocation = (locationWithoutAddress) => {
  const { lat, lon } = locationWithoutAddress;
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

  fetch(url)
    .then((response) => response.json())
    .catch((err) => console.log('Connecting to ' + url + ' failed!'))
    .then((geoData) => {
      const address = geoData?.address;
      if (!address?.road) {
        alert('Die angegebenen Koordinaten sind ungültig');
      } else {
        const { road, city, postcode } = address;
        if (city !== 'Berlin') {
          console.log(city);
          alert('Gegebene Koordinaten liegen außerhalb Berlins.');
        } else {
          const newLocation = {
            ...locationWithoutAddress,
            street: road,
            zipcode: postcode,
          };
          console.log('Added:', newLocation);
          addLocation(newLocation);
          addLocationMarker(newLocation);
          navigateToScreenById('main-screen');
          resetAddForm();
        }
      }
    });
};

const getCoordsAndUpdateLocation = (locationWithoutCoords) => {
  const { street, zipCode } = locationWithoutCoords;
  const addressString = `${street}, ${zipCode} Berlin`;
  const url = `https://nominatim.openstreetmap.org/search?q=${addressString}&format=json`;

  fetch(url)
    .then((response) => response.json())
    .catch((err) => console.log('Connecting to ' + url + ' failed!'))
    .then((geoData) => {
      const locEntry = geoData?.[0];
      if (!locEntry?.lat) {
        alert('Die angegebenen Adresse wurde nicht gefunden.');
      } else {
        const { lat, lon } = geoData[0];
        const newLocation = { ...locationWithoutCoords, lat, lon };
        console.log('Updated:', newLocation);
        updateLocation(newLocation);
        updateLocationMarker(newLocation);
        navigateToScreenById('main-screen');
      }
    });
};

const getAddressAndUpdateLocation = (locationWithoutAddress) => {
  const { lat, lon } = locationWithoutAddress;
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

  fetch(url)
    .then((response) => response.json())
    .catch((err) => console.log('Connecting to ' + url + ' failed!'))
    .then((geoData) => {
      const address = geoData?.address;
      if (!address?.road) {
        alert('Die angegebenen Koordinaten sind ungültig');
      } else {
        const { road, city, postcode } = geoData.address;
        if (city !== 'Berlin') {
          console.log(city);
          alert('Gegebene Koordinaten liegen außerhalb Berlins.');
        } else {
          const newLocation = {
            ...locationWithoutAddress,
            street: road,
            zipcode: postcode,
          };
          console.log('Updated:', newLocation);
          updateLocation(newLocation);
          updateLocationMarker(newLocation);
          navigateToScreenById('main-screen');
        }
      }
    });
};

export {
  getAddressAndAddLocation,
  getCoordsAndAddLocation,
  getAddressAndUpdateLocation,
  getCoordsAndUpdateLocation,
};
