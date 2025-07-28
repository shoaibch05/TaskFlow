import { API_URL } from "./config";

// src/api/team.js
export async function fetchBoardMembers(userId) {
  const res = await fetch(`${API_URL}api/team/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch board members");
  return res.json();
}

export async function fetchAllMembers() {
  const res = await fetch(`${API_URL}api/team`);
  if (!res.ok) throw new Error("Failed to fetch all members");
  return res.json();
}
export async function inviteMember(boardId, email) {
  const res = await fetch(`${API_URL}api/team/invite`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ boardId, email }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || "Failed to invite member");
  return data;
}
