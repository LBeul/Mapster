export const sendAuthRequest = (username, password) =>
  fetch('http://localhost:3003/users', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
