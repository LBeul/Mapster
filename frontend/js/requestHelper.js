const api = 'http://localhost:3003';

export const sendAuthRequest = (username, password) =>
  fetch(`${api}/users`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

export const postLocation = (locationData) => {
  return fetch(`${api}/nonsusloc`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(locationData),
  });
};
