// src/api/login.js

export function loginUser(data, callback) {
  fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => callback(null, result))
    .catch((err) => callback(err, null));
}
