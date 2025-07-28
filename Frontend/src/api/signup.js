// src/api/signup.js

import { API_URL } from "./config";

export async function signupUser(data) {
  const res = await fetch(`${API_URL}api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // parse JSON
  const json = await res.json();

  if (!res.ok) {
    // the backend uses `msg` for messages
    throw new Error(json.msg || json.error || "Signup failed");
  }

  return json; // should contain { msg: "User registered…"}
}
