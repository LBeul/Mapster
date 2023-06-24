const api = 'http://localhost:3003';

export const getLocations = () =>
  fetch('http://localhost:3003/nonsusloc', {
    cache: 'no-cache',
  });

export const sendAuthRequest = (username, password) =>
  fetch(`${api}/users`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

export const postLocation = (locationData) =>
  fetch(`${api}/nonsusloc`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(locationData),
  });

export const putLocation = (id, locationData) =>
  fetch(`${api}/nonsusloc/${id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(locationData),
  });

export const deleteLocation = (id) =>
  fetch(`${api}/nonsusloc/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  });
