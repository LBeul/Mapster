const fetchAndDisplayCoords = (event) => {
  event.preventDefault();
  const address = document.getElementById('address').value;
  const url = `https://nominatim.openstreetmap.org/search?q=${address}&format=json`;

  fetch(url)
    .then((response) => response.json())
    .catch((err) => console.log('Connecting to ' + url + ' failed!'))
    .then((geoData) => {
      const { lat, lon } = geoData[0];
      console.log(lat, lon);
    });
};
