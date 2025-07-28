import { API_URL } from "./config";

// src/api/tasks.js
export async function getTasks(boardId, token) {
  try {
    const response = await fetch(`${API_URL}api/tasks/${boardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const data = await response.json();
    return data; // expected { tasks: [...] }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}
// src/api/tasks.js
export async function createTask(taskData, token) {
  const res = await fetch(`${API_URL}api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return await res.json();
}

export async function deleteTask(taskId, token) {
  try {
    const response = await fetch(`${API_URL}api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to delete task");

    return await response.json();
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}
// src/api/tasks.js
export async function updateTaskStatus(taskId, status, token) {
  const response = await fetch(`${API_URL}api/tasks/${taskId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error("Failed to update task status");
  return await response.json();
}
export async function updateTask(taskId, updates, token) {
  const res = await fetch(`${API_URL}api/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) throw new Error("Failed to update task");
  return await res.json();
}
