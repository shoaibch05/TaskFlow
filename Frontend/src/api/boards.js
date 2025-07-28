// src/api/boards.js
import { API_URL } from "./config";
export async function getBoards(token) {
  try {
    const response = await fetch(`${API_URL}api/boards`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch boards");
    }

    const data = await response.json();
    return data; // expected { boards: [...] }
  } catch (error) {
    console.error("Error fetching boards:", error);
    throw error;
  }
}
export async function deleteBoard(boardId, token) {
  const res = await fetch(`${API_URL}api/boards/${boardId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to delete board");
  }
  return res.json(); // { msg: "Board deleted" }
}
export async function createBoard(boardData, token) {
  try {
    const res = await fetch(`${API_URL}api/boards/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(boardData),
    });
    if (!res.ok) {
      throw new Error("Failed to create board");
    }
    return await res.json();
  } catch (err) {
    console.error("Error creating board:", err);
    throw err;
  }
}
export async function addColumn(boardId, columnName, token) {
  const response = await fetch(`${API_URL}api/boards/${boardId}/columns`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ column: columnName }),
  });

  if (!response.ok) throw new Error("Failed to add column");
  return response.json();
}
