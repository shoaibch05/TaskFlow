// src/api/login.js

import { API_URL } from "./config";

export function loginUser(data, callback) {
  fetch(`${API_URL}api/auth/login`, {
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
